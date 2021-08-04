import Header from './Header';
import Footer from './Footer';
import Search from './Search';
import Cards from './Cards';

function SavedMovies (props){
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
                searchClick={props.searchClick}/>
            <Cards 
                onDeleteMovie={props.onDeleteMovie}
                moviesData={props.moviesData}
                type="Saved"/>
            <div className="savedMovies__devided" />
            <Footer />
        </>
    )
} 
export default SavedMovies;