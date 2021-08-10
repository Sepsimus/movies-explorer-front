import React from 'react';
import { useLocation } from 'react-router';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Movies from './Movies';
import SavedMovies from './SavedMovies';
import Profile from './Profile';
import NotFound from './NotFound';
import Register from './Register';
import Login from './Login';
import Main from './Main';
import movieApi from '../utils/movieApi';
import { CurrentUserContext } from '../context/CurrentUserContext';
import mainApi from '../utils/mainApi';
import ProtectedRoute from './ProtectedRoute';
import DataFiltr from './DataFiltr';

function App() {
  /* Если ошибка "Фильтрация результата происходит только если сначала отметить чекбокс, 
  затем выполнить поиск. Уже найденный результат не фильтруется, 
  если отметить чекбокс" все еще не исправлена, не могли бы вы дать более подробный комментарий. 
  Насколько я могу судить в данный момент фильтрация происходит и без отметки чекбокса, 
  а если после фильтрации по букве отметить чекбокс то появятся короткометражные фильмы с этой буквой в названии */
  const history = useHistory();

  const beatFilmApi = new movieApi({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  })

  const projectApi = new mainApi({
    baseUrl: 'http://localhost:3000',
    authorization: localStorage.getItem('jwt'),
  });

  let location = useLocation();
  const [loggedIn, setLoggedIn] = React.useState(localStorage.getItem('logged') === null ? false : JSON.parse(localStorage.getItem('logged')));
  const [cardsData, setCardsData] = React.useState([]); // массив отображаемых beatFilms фильмов
  const [savedCardsData, setSavedCardsData] = React.useState([]); // массив отображаемых сохраненных фильмов
  const [currentUser, setCurrentUser] = React.useState({});
  const [savedMoviesData, setSavedMoviesData] = React.useState([]); //массив сохраненных фильмов
  const [isMenuPopupOpen, setMenuPopupOpen] = React.useState(false);
  const [counter, setCounter] = React.useState(0);
  const [isError, setIsError] = React.useState('');

  React.useEffect(() => {
    setIsError('')
  }, [location.pathname])

  if (counter > cardsData.length) setCounter(cardsData.length);

  function startCardCounter(){
    if(window.innerWidth >= 1280)
    setCounter(12);
    if(window.innerWidth >= 768 && window.innerWidth < 1280)
      setCounter(8);
    if(window.innerWidth < 768)
      setCounter(5);
  }

  React.useEffect(() => {
    Promise.all([projectApi.getMe(), projectApi.getMovies()])
    .then(([userData, savedMoviesData]) => {
        setCurrentUser(userData);
        setSavedMoviesData(savedMoviesData);
        setSavedCardsData(JSON.parse(localStorage.getItem('searchSavedMovies')) || savedMoviesData);
        setCardsData(JSON.parse(localStorage.getItem('searchMovies') || localStorage.getItem('movies')) || {});
        startCardCounter();
    })
    .catch((err) => {
        console.log(`Ошибка:${err}. Запрос не выполнен`);
    })
  }, [localStorage.getItem('jwt')]);

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if(jwt){
      projectApi.tokenCheck(jwt)
      .then((tokenData) => {
        if(tokenData){
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        console.log(`Ошибка:${err}. Запрос не выполнен`);
      })
    }
  }, []);

  function registerNewUser(registerInfo){
    const authInfo = {
      email: registerInfo.email,
      password: registerInfo.password
    }
    projectApi.registration(JSON.stringify(registerInfo))
    .then(() => {
      setIsError('');
      authorizationUser(authInfo)
      })
    .catch((err) => {
      setIsError('Что-то пошло не так');
      console.log(`Ошибка:${err}. Запрос не выполнен`);
    })
  }

  function authorizationUser(authorizationInfo){
    projectApi.authorization(JSON.stringify(authorizationInfo))
    .then((authorizationData) => {
      setIsError('');
      localStorage.setItem('jwt', authorizationData.token);
      setCardsData([]);
      setLoggedIn(true);
      localStorage.setItem('logged', JSON.stringify(true))
      history.push('/movies');
    })
    .catch((err) => {
      setIsError('Что-то пошло не так');
      console.log(`Ошибка:${err}. Запрос не выполнен`);
    })
  }

  function signOut(){
    localStorage.removeItem('searchMovies');
    localStorage.removeItem('searchSavedMovies');
    localStorage.removeItem('jwt');
    localStorage.removeItem('movies');
    history.push('/');
    setLoggedIn(false);
    localStorage.removeItem('logged');
}

function changeUserInfo(newUserInfo){
  projectApi.editProfile(JSON.stringify(newUserInfo))
  .then((userData) => {
    setIsError('');
    setCurrentUser(userData)
  })
  .catch((err) => {
    setIsError('Что-то пошло не так');
    console.log(`Ошибка:${err}. Запрос не выполнен`)})
}

function saveMovie(savedMovieInfo){
  projectApi.addMovie(JSON.stringify(savedMovieInfo))
  .then(() => projectApi.getMovies()
    .then((savedMoviesData) => {
      setSavedMoviesData(savedMoviesData);
      setSavedCardsData(savedMoviesData)
    })
    .catch((err) => console.log(`Ошибка:${err}. Запрос не выполнен`)))
  .catch((err) => console.log(`Ошибка:${err}. Запрос не выполнен`))
}

function deleteMovie(deleteMovieId){
  projectApi.deleteMovie(deleteMovieId)
  .then(() => projectApi.getMovies()
    .then((savedMoviesData) => {
      setSavedMoviesData(savedMoviesData);
      setSavedCardsData(savedMoviesData)
    })
    .catch((err) => console.log(`Ошибка:${err}. Запрос не выполнен`)))
  .catch((err) => console.log(`Ошибка:${err}. Запрос не выполнен`))
}

  function handleMenuClick(){
    setMenuPopupOpen(true);
  }

  function closeAllPopups(){
    setMenuPopupOpen(false);
  };
 
  function handleSearchClick(route, searchValue, isShortCut){
    startCardCounter();
    handleFiltrClick(route, searchValue, isShortCut);
    if(localStorage.getItem('movies') !== null || route !== 'Movie') return
    beatFilmApi.getFilms()
    .then((movies) => {
      localStorage.setItem('movies', JSON.stringify(movies));
      setCardsData(JSON.parse(localStorage.getItem('movies')));
      handleFiltrClick(route, searchValue, isShortCut);
    })
    .catch((err) => {
      setIsError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      console.log(`Ошибка:${err}. Запрос не выполнен`);
    })
  }

  function handleFiltrClick(route, searchValue, isShortCut){
    if(localStorage.getItem('movies') === null && route === 'Movie') return
    const startArray = route === 'Movie' ? JSON.parse(localStorage.getItem('movies')) : savedMoviesData;
    if(route === 'Movie'){
      localStorage.setItem('searchMovies', JSON.stringify(DataFiltr(startArray, searchValue, isShortCut)))
      setCardsData(DataFiltr(startArray, searchValue, isShortCut));
    }else{
      localStorage.setItem('searchSavedMovies', JSON.stringify(DataFiltr(startArray, searchValue, isShortCut)))
      setSavedCardsData(DataFiltr(startArray, searchValue, isShortCut));
    }
  }

  function handleMoreClick(){
    if(window.innerWidth >= 1280)
      setCounter(counter+4);
    if(window.innerWidth >= 768 && window.innerWidth < 1280)
      setCounter(counter+2);
    if(window.innerWidth < 768)
      setCounter(counter+1);
  }

  return (
    <CurrentUserContext.Provider value = {currentUser}>
      <div className="substrate">
        <div className="page">
          <Switch>

            <ProtectedRoute
            component={Register}
            path='/signup'
            loggedIn={!loggedIn}
            onError={isError}
            onRegisterUser={registerNewUser}
            onAuthorizationUser={authorizationUser}
            linkAbout="/"
            linkSignIn="/signin"/>

          <ProtectedRoute
            component={Login}
            path='/signin'
            loggedIn={!loggedIn}
            onError={isError}
            onAuthorizationUser={authorizationUser}
            linkAbout="/"
            linkSignUp="/signup"/>

            <ProtectedRoute
                onError={isError}
                counter={counter}
                onMoreClick={handleMoreClick} 
                loggedIn={loggedIn}
                onDeleteMovie={deleteMovie}
                savedMoviesData={savedMoviesData}
                onSaveMovie={saveMovie}
                moviesData={cardsData}
                searchClick={handleSearchClick}
                isOpen={isMenuPopupOpen}
                menuOpen={handleMenuClick}
                onClose={closeAllPopups}
                linkAbout="/"
                linkMovies="/movies"
                linkProfile="/profile"
                linkSavedMovies="/saved-movies"
                path="/movies"
                component={Movies}/>

              <ProtectedRoute
                moviesData={savedCardsData}
                loggedIn={loggedIn}
                component={SavedMovies}
                path="/saved-movies"
                onDeleteMovie={deleteMovie}
                savedMoviesData={savedMoviesData}
                searchClick={handleSearchClick}
                isOpen={isMenuPopupOpen}
                menuOpen={handleMenuClick}
                onClose={closeAllPopups}
                linkAbout="/"
                linkMovies="/movies"
                linkProfile="/profile"
                linkSavedMovies="/saved-movies"/>

                <ProtectedRoute 
                  onError={isError}
                  loggedIn={loggedIn}
                  component={Profile}
                  path="/profile"
                  onChangeUser={changeUserInfo}
                  onSignOut={signOut}
                  isOpen={isMenuPopupOpen}
                  menuOpen={handleMenuClick}
                  onClose={closeAllPopups}
                  linkAbout="/"
                  linkMovies="/movies"
                  linkProfile="/profile"
                  linkSavedMovies="/saved-movies"/>

            <Route exact path ="/">
              <Main 
                isOpen={isMenuPopupOpen}
                menuOpen={handleMenuClick}
                onClose={closeAllPopups}
                loggedIn={loggedIn}
                linkMovies="/movies"
                linkProfile="/profile"
                linkSavedMovies="/saved-movies"
                linkAbout="/"
                linkSignUp="/signup"
                linkSignIn="/signin"/>
            </Route>

            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
