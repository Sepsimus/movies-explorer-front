import React from "react";
import { Link } from "react-router-dom";
import header__userLogo from '../image/header__userLogo.svg';

function Popup(props){
    return(
        <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
                <nav className="popup__nav">
                    <button className="popup__exit" type="button" onClick={props.onClose}/>
                <div className="popup__nav-wrapper">
                    <Link className='popup__link' to={props.linkAbout || ''} onClick={props.onClose} >Главная</Link>
                    <Link className='popup__link popup__link_type_active' to={props.linkMovies || ''} onClick={props.onClose}>Фильмы</Link>
                    <Link className='popup__link' to={props.linkSavedMovies || ''} onClick={props.onClose}>Сохраненные фильмы</Link>
                </div> 
                <Link className="popup__profile-link" to={props.linkProfile || ''} onClick={props.onClose}>
                    <p className='popup__text'>Аккаунт</p>
                    <div className='popup__user-circle'>
                        <img className="popup__user-logo" src={header__userLogo} alt="Аватар пользователя" />
                    </div>
                </Link>
                </nav>
        </div>
    )
}

export default Popup;