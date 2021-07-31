import React from 'react';

function Card(props){
    let buttonClass;
    let hoursMovie = '';
    let likeClass ='';
    const button = document.querySelector('.card__button');
    const [isLike, setLike] = React.useState(props.type === 'Movie' ? props.savedMoviesData.some(movie => movie.movieId === props.movieId) : 'another' );

    function handleLikeClick(){
        setLike(!isLike);
        if(!isLike){
                props.onSaveMovie({
                country: props.country,
                director: props.director,
                duration: props.duration,
                year: props.year,
                description: props.description,
                image: props.image,
                trailer: props.trailer,
                thumbnail: props.image,
                movieId: props.movieId,
                nameRU: props.nameRU,
                nameEN: props.nameEN,
            })
        }else{
            let deleteMovieId;
            props.savedMoviesData.forEach(item => {
                if(item.movieId === props.movieId)
                deleteMovieId = item._id
                })
            props.onDeleteMovie(deleteMovieId)
        }
    }

    function deleteCard(){
            props.onDeleteMovie(props.card._id)
    }

    if(props.type === 'Movie'){
        buttonClass = ""
        likeClass = isLike ? ' card__like_type_active' : ' card__like_type_inactive'

    }else{
        buttonClass = "card__delete"
    }

    if (Math.floor(props.duration/60) !== 0) hoursMovie = `${Math.floor(props.duration/60)}ч`;

    return(
        <div className="card">
            <img className="card__img" src={props.image} alt="Постер"/>
            <div className="card__main">
                <p className="card__name">{props.nameRU}</p>
                <button className={`card__button ${buttonClass + likeClass}`} onClick={isLike==='another' ? deleteCard : handleLikeClick} type="button"/>
            </div>
            <p className="card__time">{`${hoursMovie} ${props.duration%60}м`}</p>
        </div>
    )
}

export default Card;