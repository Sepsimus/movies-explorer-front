import React from "react";
import Header from './Header';
import { CurrentUserContext } from "../context/CurrentUserContext";

function Profile(props){

    const userInfo = React.useContext(CurrentUserContext);

    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');

    function changeUserInfo(e){
        e.preventDefault();
        props.onChangeUser({
          name: name,
          email: email
        })
      }

      function handleEmailChange(e){
          setEmail(e.target.value)
      }

      function handleNameChange(e){
        setName(e.target.value)
    }

      React.useEffect(() => {
        setName(userInfo.name || '');
        setEmail(userInfo.email || '');
    }, [userInfo]);

    const [form, setForm] = React.useState({}); 
    const [errors, setErrors] = React.useState({}); 
    const [isValid, setIsValid] = React.useState(false);
  
    const handleChange = (event) => {
      const target = event.target;
      const name = target.name;
      const value = target.value;
      setForm({...form, [name]: value});
      setErrors({...errors, [name]: target.validationMessage });
      setIsValid(target.closest("form").checkValidity());
    };
  
    const isDisabled = !isValid || (form.name === userInfo.name && form.email === userInfo.email)? 'disabled' : '';
    const buttonActive = isValid? 'profile__button_active' : 'profile__button_inactive';

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
                <form className="profile__data" onSubmit={changeUserInfo} onChange={handleChange} noValidate>
                    <div className="profile__wrapper profile__wrapper_type_name">
                        <h2 className="profile__text">Имя</h2>
                        <input className="profile__text" name="name" type="string" value={name} onChange={handleNameChange} minLength="2" maxLength="30" required/>
                    </div>
                    <div className="profile__wrapper profile__wrapper_type_email">
                        <h2 className="profile__text">E-mail</h2>
                        <input className="profile__text" name="email" type="email" value={email} onChange={handleEmailChange} required/>
                    </div>
                    <span className="password-input-error form__input-error">{props.onError}</span>
                    <button className={`profile__button profile__button_type_edit ${buttonActive}`} type="submit" disabled={isDisabled}>Редактировать</button>
                </form>
                <div className="profile__footer">
                    <button className="profile__button profile__button_type_exit" onClick={props.onSignOut}>Выйти из аккаунта</button>
                </div>
            </div>
        </>
    )
}

export default Profile;