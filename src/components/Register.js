import React from "react";
import {Link} from "react-router-dom";

function Register(props){
 
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');

  function registration(e){
    e.preventDefault();
    props.onRegisterUser({
      password: password,
      email: email,
      name: name
    })
  }

  function handleEmailChange(e){
    setEmail(e.target.value);
  }

  function handlePasswordChange(e){
    setPassword(e.target.value);
  }

  function handleNameChange(e){
    setName(e.target.value);
  }

    return(
        <div className="form">
            <div className="form__wrapper">
                <Link className="logo form__logo" to={props.linkAbout || ''}/>
                <h2 className="form__title">Добро пожаловать!</h2>
                <form className="form__container" onSubmit={registration}>
                    <p className="form__placeholder">Имя</p>
                    <input id="name-input" className="form__input form__input_name" onChange={handleNameChange} name="name" type="string" minLength="2" maxLength="40" required />
                    <span className="name-input-error form__input-error" />
                    <p className="form__placeholder">E-mail</p>
                    <input id="email-input" className="form__input form__input_email" onChange={handleEmailChange} name="email" type="email" minLength="2" maxLength="40" required />
                    <span className="email-input-error form__input-error" />
                    <p className="form__placeholder">Пароль</p>
                    <input id="password-input" className="form__input form__input_password" onChange={handlePasswordChange} name="password" type="password" minLength="8" required />
                    <span className="password-input-error form__input-error" />
                    <button className="form__enter" type="submit">Зарегистрироваться</button>
                    <p className="form__already-registered">Уже зарегистрированы?&nbsp;
                    <Link to={props.linkSignIn || ''} className="form__already-registered form__already-registered_type_button">
                        Войти
                    </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register;