import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Movies from './Movies';
import SavedMovies from './SavedMovies';
import Profile from './Profile';
import NotFound from './NotFound';
import Register from './Register';
import Login from './Login';
import Main from './Main';

function App() {

  const [isMenuPopupOpen, setMenuPopupOpen] = React.useState(false);
  function handleMenuClick(){
    setMenuPopupOpen(true);
  }
  function closeAllPopups(){
    setMenuPopupOpen(false);
  };

  return (
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
            linkAbout="/"
            linkSignUp="/signup"/>
          </Route>
  
          <Route path="/movies">
            <Movies 
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
  );
}

export default App;
