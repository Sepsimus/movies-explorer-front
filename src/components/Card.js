import React from 'react';

function Card(props){
    const card = props.card;
    let buttonClass;
    let hoursMovie = '';
    let likeClass ='';
    const [isLike, setLike] = React.useState(props.type === 'Movie' ? props.savedMoviesData.some(movie => movie.movieId === card.id) : 'another' );
    const image = props.type === 'Movie' ? `${'https://api.nomoreparties.co'}${card.image.url}` : card.image

    function handleLikeClick(){
        setLike(!isLike);
        if(!isLike){
            props.onSaveMovie({
                country: card.country || ' ',
                director: card.director || ' ',
                duration: card.duration,
                year: card.year,
                description: card.description,
                image: image,
                trailer: card.trailerLink || ' ',
                thumbnail: image,
                movieId: card.movieId || card.id,
                nameRU: card.nameRU,
                nameEN: card.nameEN || ' ',
            })
        }else{
            let deleteMovieId;
            props.savedMoviesData.forEach(item => {
                if(item.movieId === card.id)
                deleteMovieId = item._id
                })
            props.onDeleteMovie(deleteMovieId)
        }
    }

    function deleteCard(){
            props.onDeleteMovie(card._id)
    }

    if(props.type === 'Movie'){
        buttonClass = ""
        likeClass = isLike ? ' card__like_type_active' : ' card__like_type_inactive'

    }else{
        buttonClass = "card__delete"
    }

    if (Math.floor(card.duration/60) !== 0) hoursMovie = `${Math.floor(card.duration/60)}ч`;

    return(
        <div className="card">
            <img className="card__img" src={image} alt="Постер"/>
            <div className="card__main">
                <p className="card__name">{card.nameRU}</p>
                <button className={`card__button ${buttonClass + likeClass}`} onClick={isLike==='another' ? deleteCard : handleLikeClick} type="button"/>
            </div>
            <p className="card__time">{`${hoursMovie} ${card.duration%60}м`}</p>
        </div>
    )
}

export default Card;