import search__img from '../image/search__img.svg'

function Search(){
    return(
        <div className="search">
            <form className="search__form">
                <img className="search__img" alt="Картинка поиска" src={search__img}/>
                <input className="search__film-input" type="text" required placeholder="Фильм" name="film" />
                <button className="search__found" />
                <div className="search__line" />
            </form>
            <div className="search__wrapper">
                <div className="search__checkbox" />
                <p className="search__text">Короткометражки</p>
            </div>
        </div>
    )
}

export default Search;