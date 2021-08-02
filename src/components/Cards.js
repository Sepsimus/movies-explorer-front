import Card from './Card';

function Cards(props){

    function cardDraw(){
        let n;
        let array =[];
        if(props.type==="Movie") n=16
            else{
                n=props.moviesData.length
            }
        for(let i = 0; i < n; i++){
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