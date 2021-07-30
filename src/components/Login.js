import React from "react";
import {Link} from "react-router-dom";

function Login(props){
 
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function loginInfo(e){
    e.preventDefault();
    props.onAuthorizationUser({
      password: password,
      email: email
    })
  }

  function handleEmailChange(e){
    setEmail(e.target.value);
  }

  function handlePasswordChange(e){
    setPassword(e.target.value);
  }

    return(
        <div className="form">
            <div className="form__wrapper">
                <Link className="logo form__logo" to={props.linkAbout || ''}/>
                <h2 className="form__title">Рады видеть!</h2>
                <form className="form__container" onSubmit={loginInfo}>
                    <p className="form__placeholder">E-mail</p>
                    <input id="email-input" className="form__input form__input_email" onChange={handleEmailChange} name="e-mail" type="email" minLength="2" maxLength="40" required />
                    <span className="email-input-error form__input-error" />
                    <p className="form__placeholder">Пароль</p>
                    <input id="password-input" className="form__input form__input_password" onChange={handlePasswordChange} name="password" type="password" minLength="8" required />
                    <span className="password-input-error form__input-error" />
                    <button className="form__enter form__enter_type_login" type="submit" >Войти</button>
                    <p className="form__already-registered">Еще не зарегистрированы?&nbsp;
                    <Link to={props.linkSignUp || ''} className="form__already-registered form__already-registered_type_button">
                        Регистрация
                    </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login;