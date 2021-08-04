import React from "react"

function DataFiltr(filmArray, name, shortCut){
    const searchValue = new RegExp(name.toLowerCase());
    let filtredFilms
    if (shortCut && name !== ''){
        filtredFilms = filmArray.filter((item) => item.duration <= 40);
        console.log(filtredFilms);
        filtredFilms = filtredFilms.filter((item) => item.nameRU.toLowerCase().match(searchValue));
        return (filtredFilms);
     }
    if (shortCut){
       filtredFilms = filmArray.filter((item) => item.duration <= 40);
       console.log(1);
       return (filtredFilms);
    }
    if(name !== ''){
        filtredFilms = filmArray.filter((item) => item.nameRU.toLowerCase().match(searchValue));
        console.log(1);
        return (filtredFilms);
    }
    return (filmArray);
}

export default DataFiltr