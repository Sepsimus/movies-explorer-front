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

  const [cardsData, setCardsData] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [savedMoviesData, setSavedMoviesData] = React.useState([]);
  const [isMenuPopupOpen, setMenuPopupOpen] = React.useState(false);
  
  React.useEffect(() => {
    Promise.all([projectApi.getMe(), projectApi.getMovies()])
    .then(([userData, savedMoviesData]) => {
        console.log(userData);
        setCurrentUser(userData);
        setSavedMoviesData(savedMoviesData);
    })
    .catch((err) => {
        console.log(`Ошибка:${err}. Запрос не выполнен`);
    })
  }, [localStorage.getItem('jwt')]);

//console.log(savedMoviesData);

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
      //handleLogin();
      history.push('/movies');
    })
    .catch((err) => {
      console.log(`Ошибка:${err}. Запрос не выполнен`);
    })
  }

/*  
  function signOut(){
    localStorage.removeItem('jwt');
    history.push('/sign-in');
    setLoggedIn(false);
}*/

  function handleMenuClick(){
    setMenuPopupOpen(true);
  }

  function closeAllPopups(){
    setMenuPopupOpen(false);
  };

  function handleSearchClick(){
    beatFilmApi.getFilms()
    .then((movies) => {
      //console.log(movies)
      localStorage.setItem('movies', JSON.stringify(movies))
      setCardsData(JSON.parse(localStorage.getItem('movies')));
    })
    .catch((err) => {
      console.log(`Ошибка:${err}. Запрос не выполнен`);
    })
  }

//console.log(cardsData);

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
