import React from "react";
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
    const user = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === user._id;
    const cardDeleteButtonClassName = (
        isOwn ? 'card__thrash card__thrash_active' : 'card__thrash'
    );
    const isLiked = card.likes.some(i => i._id === user._id);
    const cardLikeButtonClassName = (
        isLiked ? 'card__like card__like_active': 'card__like'
    );
    function handleClick() {
        onCardClick(card);
    }
    function handleCardLike(){
        onCardLike(card);
    }

    function handleCardDelete(){
        onCardDelete(card);
    }
    return (
        <div className="card">
            <button  onClick={handleCardDelete} className={cardDeleteButtonClassName} type="button"></button>
            <img src={card.link} className="card__image" alt={card.name} onClick={handleClick}/>
            <div className="card__info">
                <h3 className="card__title">{card.name}</h3>
                <div className="card__likes">
                    <button onClick={handleCardLike} className={cardLikeButtonClassName} type="button"></button>
                    <p className="card__likes-number">{card.likes.length}</p>
                </div>
            </div>
        </div>
    )
};

export default Card;