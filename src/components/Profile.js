import React from "react";
import Header from './Header';
import { CurrentUserContext } from "../context/CurrentUserContext";

function Profile(props){

    const userInfo = React.useContext(CurrentUserContext);

    const form = document.querySelector('.profile__button_type_edit')

    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');

    function changeUserInfo(e){
        e.preventDefault();
        props.onChangeUser({
          name: name,
          email: email
        })
      }

      function handleNameChange(e){
        setName(e.target.value);
      }
    
      function handleEmailChange(e){
        setEmail(e.target.value);
      }

      React.useEffect(() => {
        setName(userInfo.name || '');
        setEmail(userInfo.email || '');
    }, [userInfo]);


    return(
        <>
            <Header 
                loggedIn={props.loggedIn}
                isOpen={props.isOpen}
                menuOpen={props.menuOpen}
                onClose={props.onClose}
                linkAbout={props.linkAbout}
                linkMovies={props.linkMovies}
                linkProfile={props.linkProfile}
                linkSavedMovies={props.linkSavedMovies}/>

            <div className="profile__content">
                <p className="profile__greeting">{`Привет, ${name}!`}</p>
                <form className="profile__data" onSubmit={changeUserInfo}>
                    <div className="profile__wrapper profile__wrapper_type_name">
                        <h2 className="profile__text">Имя</h2>
                        <input className="profile__text" name="name" type="string" value={name} onChange={handleNameChange} minLength="2" maxLength="30"/>
                    </div>
                    <div className="profile__wrapper profile__wrapper_type_email">
                        <h2 className="profile__text">E-mail</h2>
                        <input className="profile__text" name="email" type="email" value={email} onChange={handleEmailChange}/>
                    </div>
                    <button className="profile__button profile__button_type_edit" type="submit">Редактировать</button>
                </form>
                <div className="profile__footer">
                    <button className="profile__button profile__button_type_exit" onClick={props.onSignOut}>Выйти из аккаунта</button>
                </div>
            </div>
        </>
    )
}

export default Profile;