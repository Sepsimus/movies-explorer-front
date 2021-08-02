import React from 'react';
import { Link } from 'react-router-dom';
import header__userLogo from '../image/header__userLogo.svg';
import Popup from './Popup';

function Header(props) {

    function handleClick(){
        props.menuOpen();
    }

    const headerClassName = !props.loggedIn ? 'header__navigation_disabled' : ' ';
    const mainClassName = props.loggedIn ? 'header__navigation_disabled' : ' ';
    const profileClassName = !props.loggedIn ? 'header__profile-link_disabled' : ' ';

    return(
        <header className="header">
            <Link className="logo header__logo" to={props.linkAbout || ''}/>

            <div className={`${mainClassName} header__navigation header__navigation_type_main`}>
                        <Link className='header__link header__link_type_register' to={props.linkSignUp || ''}>Регистрация</Link>
                        <Link className='header__link header__link_type_login' to={props.linkSignIn || ''}>Войти</Link>
                    </div>
             
            <div className={`${headerClassName} header__navigation header__navigation_type_header`}>
                <Link className='header__link header__link_type_header' to={props.linkMovies || ''}>Фильмы</Link>
                <Link className='header__link header__link_type_header' to={props.linkSavedMovies || ''}>Сохраненные фильмы</Link>
            </div> 
            <Link className={`${profileClassName} header__profile-link`} to={props.linkProfile || ''}>
                <p className='header__text'>Аккаунт</p>
                <div className='header__user-circle'>
                    <img className="header__user-logo" src={header__userLogo} alt="Аватар пользователя" />
                </div>
            </Link>
            <button className="header__menu" type="button" onClick={handleClick}/>
            <Popup  
                isOpen={props.isOpen}
                onClose={props.onClose}
                linkAbout={props.linkAbout}
                linkMovies={props.linkMovies}
                linkProfile={props.linkProfile}
                linkSavedMovies={props.linkSavedMovies}/>
        </header>
    )
}
export default Header;