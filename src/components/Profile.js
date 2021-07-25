import React from "react";
import Header from './Header';

function Profile(props){
    return(
        <>
            <Header 
                isOpen={props.isOpen}
                menuOpen={props.menuOpen}
                onClose={props.onClose}
                linkAbout={props.linkAbout}
                linkMovies={props.linkMovies}
                linkProfile={props.linkProfile}
                linkSavedMovies={props.linkSavedMovies}/>

            <div className="profile__content">
                <p className="profile__greeting">Привет, Виталий!</p>
                <div className="profile__data">
                    <div className="profile__wrapper profile__wrapper_type_name">
                        <h2 className="profile__text">Имя</h2>
                        <p className="profile__text">Виталий</p>
                    </div>
                    <div className="profile__wrapper profile__wrapper_type_email">
                        <h2 className="profile__text">E-mail</h2>
                        <p className="profile__text">pochta@yandex.ru</p>
                    </div>
                </div>
                <div className="profile__footer">
                    <button className="profile__button profile__button_type_edit">Редактировать</button>
                    <button className="profile__button profile__button_type_exit">Выйти из аккаунта</button>
                </div>
            </div>
        </>
    )
}

export default Profile;