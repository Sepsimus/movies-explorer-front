import Header from './Header';
import Footer from './Footer';
import Search from './Search';
import Cards from './Cards';

function SavedMovies (props){
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
        {    /*<Cards 
                type="Saved"/>*/}
            <div className="savedMovies__devided" />
            <Footer />
        </>
    )
} 
export default SavedMovies;