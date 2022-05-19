import React from 'react';

function ImagePopup({card, onClose}) {
    return (
        <div className={card._id ? `popup popup_type_show popup_opened` : `popup popup_type_show`}>
            <div className="popup__overlay" onClick={onClose}></div>
            <div className="popup__image-container">
                <button className="popup__button-close" type="button" onClick={onClose}></button>
                <img src={card.link} alt={card.name} className="popup__image"/>
                <p className="popup__text">{card.name}</p>
            </div>
        </div>
    )
}

export default ImagePopup;