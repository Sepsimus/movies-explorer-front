import Card from './Card';

function Cards(props){

    function cardDraw(){
        let counter;
        let array = [];
        
        if(props.moviesData.length === 0) return (<p className="cards__error">Ничего не найдено</p>)

        if(localStorage.getItem('movies') === null && props.type==="Movie") return;
        
        if(props.type==="Movie" && props.moviesData.length > 12){ 
            counter=props.counter
        }else{
                counter=props.moviesData.length
            }
        for(let i = 0; i < counter; i++){
            let item = props.moviesData[i];
            array.push(<Card 
                    card={item}
                    onDeleteMovie={props.onDeleteMovie}
                    savedMoviesData={props.savedMoviesData}
                    onSaveMovie={props.onSaveMovie}
                    type={props.type}
                    key={item.id || item._id}
                    />)
        }
        
        return(array)
    }

    return(
        <section className="cards">
        {
            cardDraw()
        }
        </section>
    )
}

export default Cards;