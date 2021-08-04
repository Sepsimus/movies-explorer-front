import React from "react";
import {Link} from "react-router-dom";

function Login(props){

  function loginInfo(e){
    e.preventDefault();
    props.onAuthorizationUser({
      password: form.password,
      email: form.email
    })
  }

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

  const isDisabled = !isValid? 'disabled' : '';
  const buttonActive = isValid? 'form__enter_active' : 'form__enter_inactive';

    return(
        <div className="form">
            <div className="form__wrapper">
                <Link className="logo form__logo" to={props.linkAbout || ''}/>
                <h2 className="form__title">Рады видеть!</h2>
                <form className="form__container" onSubmit={loginInfo} noValidate onChange={handleChange}>
                    <p className="form__placeholder">E-mail</p>
                    <input id="email-input" className={`form__input form__input_email ${errors.email !== '' ? 'form__input_type_red' : ''}`} name="email" type="email" minLength="2" maxLength="40" required />
                    <span className="email-input-error form__input-error">{errors.email}</span>
                    <p className="form__placeholder">Пароль</p>
                    <input id="password-input" className={`form__input form__input_password ${errors.password !== '' ? 'form__input_type_red' : ''}`} name="password" type="password" minLength="8" required />
                    <span className="password-input-error form__input-error">{errors.password}</span>                    
                    <span className="form__enter-error form__enter-error_type_login">{props.onError}</span>
                    <button className={`${buttonActive} form__enter`} type="submit" disabled={isDisabled}>Войти</button>
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