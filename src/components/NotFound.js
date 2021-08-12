import React from 'react';
import { useHistory } from 'react-router-dom';

function NotFound(){
    const history = useHistory();
    return(
        <div className="notFound">
            <div className="notFound__wrapper">
                <h2 className="notFound__error-code">404</h2>
                <p className="notFound__text">Страница не найдена</p>
            </div>
            <button className="notFound__link" onClick={() => history.goBack()}>Назад</button>
        </div>
    )
}

export default NotFound;