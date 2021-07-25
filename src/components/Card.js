import card__img from '../image/card__img.jpg'

function Card(props){
    let buttonClass;
    if(props.type === 'Movie'){
        buttonClass = "card__button card__like_type_active"
    }else{
        buttonClass = "card__button card__delete"
    }
    return(
        <div className="card">
            <img className="card__img" src={card__img} alt="Постер"/>
            <div className="card__main">
                <p className="card__name">33 слова о дизайне</p>
                <button className={buttonClass} type="button"/>
            </div>
            <p className="card__time">1ч 42м</p>
        </div>
    )
}

export default Card;