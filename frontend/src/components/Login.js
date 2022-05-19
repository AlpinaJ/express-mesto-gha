import React, {useState} from "react";
import {Link, useHistory, useNavigate} from 'react-router-dom';
import auth from "../utils/Auth.js";
import InfoToolTip from "./InfoTooltip";

function Login({onLogin}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        onLogin(email,password)
    }
    function handleSetEmail(e){
        setEmail(e.target.value);
    }

    function handleSetPassword(e){
        setPassword(e.target.value);
    }


    return (
        <div className="form__container">
            <h1 className="form__title">Вход</h1>
            <form className="form" onSubmit={handleSubmit}>
                <input onChange={handleSetEmail} type="email" className="form__input" placeholder="Email">
                </input>
                <input onChange={handleSetPassword} type="password" className="form__input" placeholder="Пароль">
                </input>
                <button type="submit" className="form__button">Войти</button>
            </form>
        </div>
    )
}

export default Login;