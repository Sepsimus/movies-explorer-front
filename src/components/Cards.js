import Card from './Card';

function Cards(props){
    return(
        <section className="cards">
        {props.moviesData.map((item) => (
                <Card 
                    card={item}
                    onDeleteMovie={props.onDeleteMovie}
                    savedMoviesData={props.savedMoviesData}
                    onSaveMovie={props.onSaveMovie}
                    country={item.country}
                    director={item.director}
                    description={item.description}
                    year={item.year}
                    nameEN={item.nameEN}
                    type={props.type}
                    movieId={item.id || item.movieId}
                    key={item.id || item.movieId}
                    nameRU={item.nameRU}
                    image={ props.type === 'Movie' ? `${'https://api.nomoreparties.co'}${item.image.url}` : item.image}
                    trailer={item.trailerLink}
                    duration={item.duration}/>
        ))}
        </section>
    )
}

export default Cards;