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

//console.log(cardsData);

  /*function registerNewUser(registerInfo){
    authApi.registration(JSON.stringify(registerInfo))
    .then((registerData) => {
      setSuccessfulyRegistered(true);
      setIsRegisterPopupOpen(true);
    })
    .catch((err) => {
      setSuccessfulyRegistered(false);
      setIsRegisterPopupOpen(true);
      console.log(`Ошибка:${err}. Запрос не выполнен`);
    })
  }
*/
  function authorizationUser(authorizationInfo){
    projectApi.authorization(JSON.stringify(authorizationInfo))
    .then((authorizationData) => {
      localStorage.setItem('jwt', authorizationData.token);
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
    history.push('/signin');
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

  return (
    <CurrentUserContext.Provider value = {currentUser}>
      <div className="substrate">
        <div className="page">
          <Switch>

            <Route path="/signup">
              <Register 
              linkAbout="/"
              linkSignIn="/signin"/>
            </Route>
            
            <Route path="/signin">
              <Login 
              onAuthorizationUser={authorizationUser}
              linkAbout="/"
              linkSignUp="/signup"/>
            </Route>
    
            <Route path="/movies">
              <Movies
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
              linkSavedMovies="/saved-movies"/>
            </Route>

            <Route path="/saved-movies">
              <SavedMovies 
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
            </Route>

            <Route path="/profile">
              <Profile
              onChangeUser={changeUserInfo}
              onSignOut={signOut}
              isOpen={isMenuPopupOpen}
              menuOpen={handleMenuClick}
              onClose={closeAllPopups}
              linkAbout="/"
              linkMovies="/movies"
              linkProfile="/profile"
              linkSavedMovies="/saved-movies"/>
            </Route>

            <Route exact path ="/">
              <Main 
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
