import React, {useContext} from 'react';
import Card from "./Card.js";
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike,onCardDelete, cards}) {
    const user = useContext(CurrentUserContext);
    return (
        <main>
            <section className="profile">
                <div className="profile__info">
                    <div className="profile__avatar">
                        <img src={user.avatar} className="profile__avatar-image"
                             alt="Фото пользователя" onClick={onEditAvatar}/>
                    </div>
                    <div className="profile__description">
                        <div className="profile__text">
                            <h1 className="profile__title">{user.name}</h1>
                            <button id="edit-button" className="profile__edit-button" type="button"
                                    onClick={onEditProfile}>
                            </button>
                        </div>
                        <h2 className="profile__subtitle">{user.about}</h2>
                    </div>
                </div>
                <button id="add-button" className="profile__add-button" type="button" onClick={onAddPlace}>
                </button>
            </section>
            <section className="main">
                {
                    cards.map((element) => (<Card card={element} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} key={element._id}/>))}
            </section>
        </main>
    )
}

export default Main;