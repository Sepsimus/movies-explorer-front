import React from "react";
import {Link} from "react-router-dom";

function Register(props){

  function registration(e){
    e.preventDefault();
    props.onRegisterUser({
      password: form.password,
      email: form.email,
      name: form.name
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
                <h2 className="form__title">Добро пожаловать!</h2>
                <form className="form__container" onSubmit={registration} noValidate onChange={handleChange}>
                    <p className="form__placeholder">Имя</p>
                    <input id="name-input" className={`form__input form__input_name ${errors.name !== '' ? 'form__input_type_red' : ''}`} name="name" type="string" minLength="2" maxLength="40" required />
                    <span className="name-input-error form__input-error">{errors.name}</span>
                    <p className="form__placeholder">E-mail</p>
                    <input id="email-input" className={`form__input form__input_email ${errors.email !== '' ? 'form__input_type_red' : ''}`} name="email" type="email" minLength="2" maxLength="40" required />
                    <span className="email-input-error form__input-error">{errors.email}</span>
                    <p className="form__placeholder">Пароль</p>
                    <input id="password-input" className={`form__input form__input_password ${errors.password !== '' ? 'form__input_type_red' : ''}`} name="password" type="password" minLength="8" required />
                    <span className="password-input-error form__input-error">{errors.password}</span>
                    <span className="form__enter-error form__enter-error_type_register">{props.onError}</span>
                    <button className={`${buttonActive} form__enter`} type="submit" disabled={isDisabled}>Зарегистрироваться</button>
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