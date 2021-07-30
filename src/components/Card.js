import React from 'react';
import card__img from '../image/card__img.jpg'

function Card(props){
    let buttonClass;
    let hoursMovie = '';
    let likeClass ='';
    const [isLike, setLike] = React.useState(false);
    
    function handleLikeClick(){
        setLike(!isLike);
    }

    if(props.type === 'Movie'){
        buttonClass = "card__button"
        likeClass = isLike ? ' card__like_type_active' : ' card__like_type_inactive'

    }else{
        buttonClass = "card__button card__delete"
    }

    if (Math.floor(props.duration/60) !== 0) hoursMovie = `${Math.floor(props.duration/60)}ч`;

    return(
        <div className="card">
            <img className="card__img" src={props.image} alt="Постер"/>
            <div className="card__main">
                <p className="card__name">{props.nameRU}</p>
                <button className={buttonClass + likeClass} onClick={handleLikeClick} type="button"/>
            </div>
            <p className="card__time">{`${hoursMovie} ${props.duration%60}м`}</p>
        </div>
    )
}

export default Card;