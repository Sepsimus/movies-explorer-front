function More(props){
    const localStorageCheck = localStorage.getItem('movies') === null ? 'more_disabled' : '';
    const moreClass = props.counter === 100 ? 'more_disabled' : '';

    function handleMoreClick(){
        props.onMoreClick();
    }

    return(
        <div className={`more ${moreClass} ${localStorageCheck}`}>
            <button className="more__button" type="button" onClick={handleMoreClick}>Ещё</button>
        </div>
    )
}

export default More;