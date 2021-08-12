import React from 'react';
import search__img from '../image/search__img.svg'

function Search(props){

    const route = props.type === 'Movie' ? 'Movie' : 'Saved'
    let startShortCutPosition
    let startCheckArray = props.type === 'Movie' ? JSON.parse(localStorage.getItem('searchMovies')) : JSON.parse(localStorage.getItem('searchSavedMovies')) || props.savedMoviesData;
    if(localStorage.getItem('searchMovies') === null && props.type === 'Movie' ){
        startShortCutPosition = false;
    }else{
        startShortCutPosition = startCheckArray.every((item) => item.duration <= 40)
    }

    const [isShortCut, setIsShortCut] = React.useState(startShortCutPosition);
    const [searchValue, setSearchValue] = React.useState('');
    const [errorValue, setErrorValue] = React.useState('');

    function handleChangeActive(){
        setIsShortCut(!isShortCut)
        props.onShortCutFilter(route, isShortCut)
    }

    function searchValid(e){
        e.preventDefault();
        if(searchValue === '') {
            setErrorValue('Введите ключевое слово'); 
            return
        }else setErrorValue('');
        props.searchClick(route, searchValue, isShortCut);
    }

    function handleSearchChange(e){
        setSearchValue(e.target.value);
    }

    let shortCutClass = !isShortCut ? 'search__checkbox_inactive' : ''

    return(
        <>
        <p className="search-input-error">{errorValue || props.onError}</p> 
        <div className="search">                       
            <form className="search__form" noValidate>
                <img className="search__img" alt="Картинка поиска" src={search__img}/>
                <input className="search__film-input" type="text" onChange={handleSearchChange} required placeholder="Фильм" name="film" />
                <button className="search__found" type="submit" onClick={searchValid}/>
                <div className="search__line" />
            </form>
            <div className="search__wrapper">
                <button className={`search__checkbox ${shortCutClass}`} type="button" onClick={handleChangeActive}/>
                <p className="search__text">Короткометражки</p>
            </div>
        </div>
        </>
    )
}

export default Search;