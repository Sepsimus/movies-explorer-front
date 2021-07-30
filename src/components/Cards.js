import Card from './Card';

function Cards(props){
    return(
        <section className="cards">
        {props.moviesData.map((item) => (
                <Card 
                    type={props.type}
                    key={item.id}
                    nameRU={item.nameRU}
                    image={`${'https://api.nomoreparties.co'}${item.image.url}`}
                    trailerLink={item.trailerLink}
                    duration={item.duration}/>
        ))}
        </section>
    )
}

export default Cards;