import React from 'react';
import Header from './Header';
import Footer from './Footer';
import More from './More';
import Search from './Search';
import Cards from './Cards';

function Movies (props){
    return(
        <>
            <Header
                loggedIn={props.loggedIn}
                isOpen={props.isOpen}
                menuOpen={props.menuOpen}
                onClose={props.onClose}
                linkAbout={props.linkAbout}
                linkMovies={props.linkMovies}
                linkProfile={props.linkProfile}
                linkSavedMovies={props.linkSavedMovies}/>
            <Search 
                type="Movie"
                onError={props.onError}
                searchClick={props.searchClick}/>
            <Cards
                counter={props.counter}
                onDeleteMovie={props.onDeleteMovie}
                savedMoviesData={props.savedMoviesData}
                onSaveMovie={props.onSaveMovie}
                moviesData={props.moviesData}
                type="Movie"/>
            <More 
                counter={props.counter}
                onMoreClick={props.onMoreClick}/>
            <Footer />
        </>
    )
} 
export default Movies;