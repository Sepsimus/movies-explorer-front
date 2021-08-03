import Card from './Card';

function Cards(props){

    function cardDraw(){
        let counter;
        let array = [];
        
        if(localStorage.getItem('movies') === null && props.type==="Movie") return;
        if(props.type==="Movie") counter=props.counter
            else{
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
                    key={i}
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