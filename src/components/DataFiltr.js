import React from "react"

function DataFiltr(filmArray, name, shortCut){
    const searchValue = new RegExp(name.toLowerCase());
    let filtredFilms
    if (shortCut && name !== ''){
        filtredFilms = filmArray.filter((item) => item.nameRU.toLowerCase().match(searchValue));
        localStorage.setItem('searchMoviesForShortCut', JSON.stringify(filtredFilms));
        filtredFilms = filtredFilms.filter((item) => item.duration <= 40);
        return (filtredFilms);
     }
    if(name !== ''){
        filtredFilms = filmArray.filter((item) => item.nameRU.toLowerCase().match(searchValue));
        localStorage.setItem('searchMoviesForShortCut', JSON.stringify(filtredFilms));
        return (filtredFilms);
    }
    return (filmArray);
}

export default DataFiltr