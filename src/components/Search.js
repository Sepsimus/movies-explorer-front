import React from 'react';
import search__img from '../image/search__img.svg'

function Search(props){

    const [searchValue, setSearchValue] = React.useState('');
    const [errorValue, setErrorValue] = React.useState('');

    function searchValid(e){
        e.preventDefault();
        if(searchValue === '') {
            setErrorValue('Введите ключевое слово'); 
            return
        }else setErrorValue('');
        if(localStorage.getItem('movies') !== null) return
        props.searchClick();
    }

    function handleSearchChange(e){
        setSearchValue(e.target.value);
    }

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
                <div className="search__checkbox" />
                <p className="search__text">Короткометражки</p>
            </div>
        </div>
        </>
    )
}

export default Search;