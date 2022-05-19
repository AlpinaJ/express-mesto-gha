import React from 'react';
import logoPath from '../images/logo.svg';
import {Routes, Link, Route, useNavigate} from 'react-router-dom';
import Register from "./Register";

function Header({email, handleSignOut}) {
    return (
        <header className="header">
            <a href="#" className="header__link">
                <img src={logoPath} className="header__logo" alt="Место"/>
            </a>
            <Routes>
                <Route path="/signin" element={<Link to="/signup" className="header__navigation-link">Регистрация</Link>}>
                </Route>
                <Route path="/signup" element={<Link to="/signin" className="header__navigation-link">Войти</Link>}>
                </Route>
                <Route path="/users/me" element={<div>
                    <p className="header__text">{email}</p>
                    <Link to="/signin" onClick={handleSignOut} className="header__navigation-link">Выйти</Link>
                </div>}>
                </Route>
            </Routes>
        </header>
    )
}

export default Header;