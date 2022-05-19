import React, {useState} from "react";
import {Link, useHistory, useNavigate} from 'react-router-dom';
import auth from "../utils/Auth.js";
import InfoToolTip from "./InfoTooltip.js";

function Register({onRegister}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();


    function handleSubmit(e) {
        e.preventDefault();
        onRegister(email,password);
    }

    function handleSetEmail(e) {
        setEmail(e.target.value);
    }

    function handleSetPassword(e) {
        setPassword(e.target.value);
    }



    return (
        <div className="form__container">
            <h1 className="form__title">Регистрация</h1>
            <form className="form" onSubmit={handleSubmit}>
                <input onChange={handleSetEmail} type="email" className="form__input" placeholder="Email">
                </input>
                <input onChange={handleSetPassword} type="password" className="form__input" placeholder="Пароль">
                </input>
                <button type="submit" className="form__button">Зарегистрироваться</button>
            </form>
            <Link to="/signin" className="form__link">Уже зарегистрированы? Войти</Link>
        </div>
    )
}

export default Register;