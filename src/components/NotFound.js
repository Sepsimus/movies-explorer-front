import React from 'react';
import { Link } from 'react-router-dom';

function NotFound(){
    return(
        <div className="notFound">
            <div className="notFound__wrapper">
                <h2 className="notFound__error-code">404</h2>
                <p className="notFound__text">Страница не найдена</p>
            </div>
            <Link className="notFound__link" to="/movies">Назад</Link>
        </div>
    )
}

export default NotFound;