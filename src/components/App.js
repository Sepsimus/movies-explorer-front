import React from 'react';
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

function App() {

  const history = useHistory();

  const beatFilmApi = new movieApi({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  })

  const projectApi = new mainApi({
    baseUrl: 'http://localhost:3000',
    authorization: localStorage.getItem('jwt'),
  });
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [cardsData, setCardsData] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [savedMoviesData, setSavedMoviesData] = React.useState([]);
  const [isMenuPopupOpen, setMenuPopupOpen] = React.useState(false);
  const [counter, setCounter] = React.useState(16);

  if (counter > 100) setCounter(100);

  React.useEffect(() => {
    Promise.all([projectApi.getMe(), projectApi.getMovies()])
    .then(([userData, savedMoviesData]) => {
        setCurrentUser(userData);
        setSavedMoviesData(savedMoviesData);
        setCardsData(JSON.parse(localStorage.getItem('movies') || cardsData));
    })
    .catch((err) => {
        console.log(`Ошибка:${err}. Запрос не выполнен`);
    })
  }, [localStorage.getItem('jwt')]);
  
  function handleLogin(){
    setLoggedIn(!loggedIn);
  } 

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if(jwt){
      projectApi.tokenCheck(jwt)
      .then((tokenData) => {
        if(tokenData){
          handleLogin();
          history.push('/movies');
        }
      })
      .catch((err) => {
        console.log(`Ошибка:${err}. Запрос не выполнен`);
      })
    }
  }, []);

//console.log(cardsData);

  function registerNewUser(registerInfo){
    projectApi.registration(JSON.stringify(registerInfo))
    .then((registerData) => {
      //setSuccessfulyRegistered(true);
      //setIsRegisterPopupOpen(true);
    })
    .catch((err) => {
      //setSuccessfulyRegistered(false);
      //setIsRegisterPopupOpen(true);
      console.log(`Ошибка:${err}. Запрос не выполнен`);
    })
  }

  function authorizationUser(authorizationInfo){
    projectApi.authorization(JSON.stringify(authorizationInfo))
    .then((authorizationData) => {
      localStorage.setItem('jwt', authorizationData.token);
      setCardsData([]);
      handleLogin();
      history.push('/movies');
    })
    .catch((err) => {
      console.log(`Ошибка:${err}. Запрос не выполнен`);
    })
  }
  
  function signOut(){
    localStorage.removeItem('jwt');
    localStorage.removeItem('movies');
    history.push('/');
    handleLogin();
}

function changeUserInfo(newUserInfo){
  projectApi.editProfile(JSON.stringify(newUserInfo))
  .then((userData) => setCurrentUser(userData))
  .catch((err) => console.log(`Ошибка:${err}. Запрос не выполнен`))
}

function saveMovie(savedMovieInfo){
  projectApi.addMovie(JSON.stringify(savedMovieInfo))
  .then(() => projectApi.getMovies()
    .then((savedMoviesData) => setSavedMoviesData(savedMoviesData))
    .catch((err) => console.log(`Ошибка:${err}. Запрос не выполнен`)))
  .catch((err) => console.log(`Ошибка:${err}. Запрос не выполнен`))
}

function deleteMovie(deleteMovieId){
  projectApi.deleteMovie(deleteMovieId)
  .then(() => projectApi.getMovies()
    .then((savedMoviesData) => setSavedMoviesData(savedMoviesData))
    .catch((err) => console.log(`Ошибка:${err}. Запрос не выполнен`)))
  .catch((err) => console.log(`Ошибка:${err}. Запрос не выполнен`))
}

  function handleMenuClick(){
    setMenuPopupOpen(true);
  }

  function closeAllPopups(){
    setMenuPopupOpen(false);
  };

  function handleSearchClick(){
    beatFilmApi.getFilms()
    .then((movies) => {
      localStorage.setItem('movies', JSON.stringify(movies))
      setCardsData(JSON.parse(localStorage.getItem('movies')));
    })
    .catch((err) => {
      console.log(`Ошибка:${err}. Запрос не выполнен`);
    })
  }

  function handleMoreClick(){
    if(window.innerWidth >= 1280)
      setCounter(counter+16);
    if(window.innerWidth >= 768 && window.innerWidth < 1280)
      setCounter(counter+8);
    if(window.innerWidth < 768)
      setCounter(counter+5);
  }

  return (
    <CurrentUserContext.Provider value = {currentUser}>
      <div className="substrate">
        <div className="page">
          <Switch>

            <Route path="/signup">
              <Register 
              onRegisterUser={registerNewUser}
              linkAbout="/"
              linkSignIn="/signin"/>
            </Route>
            
            <Route path="/signin">
              <Login 
              onAuthorizationUser={authorizationUser}
              linkAbout="/"
              linkSignUp="/signup"/>
            </Route>
    

            <ProtectedRoute
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
                loggedIn={loggedIn}
                component={SavedMovies}
                path="/saved-movies"
                onDeleteMovie={deleteMovie}
                savedMoviesData={savedMoviesData}
                //searchClick={handleSearchClick}
                isOpen={isMenuPopupOpen}
                menuOpen={handleMenuClick}
                onClose={closeAllPopups}
                linkAbout="/"
                linkMovies="/movies"
                linkProfile="/profile"
                linkSavedMovies="/saved-movies"/>

                <ProtectedRoute 
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
