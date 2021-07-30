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
                isOpen={props.isOpen}
                menuOpen={props.menuOpen}
                onClose={props.onClose}
                linkAbout={props.linkAbout}
                linkMovies={props.linkMovies}
                linkProfile={props.linkProfile}
                linkSavedMovies={props.linkSavedMovies}/>
            <Search 
                searchClick={props.searchClick}/>
            <Cards 
                moviesData={props.moviesData}
                type="Movie"/>
            <More />
            <Footer />
        </>
    )
} 
export default Movies;