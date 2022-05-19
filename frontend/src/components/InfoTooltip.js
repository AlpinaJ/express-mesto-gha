import React from 'react';
import successImage from '../images/success.svg';
import failImage from '../images/fail.svg';

function InfoToolTip({isOpen, closePopup, status}){
    return(
        <div className={isOpen ? `popup popup_opened` : `popup`}>
            <div className="popup__overlay" onClick={closePopup}></div>
            <div className="popup__wrapper">
                <button className="popup__button-close" type="button" onClick={closePopup}></button>
                <img className="popup__status-image" src={status? successImage:failImage}
                     alt={status? "Ок":"Ошибка"}/>
                <p className="popup__status-text">{status ? "Вы успешно зарегистрировались!"
                    : "Что-то пошло не так! Попробуйте ещё раз."}</p>
            </div>
        </div>
    )
}

export default InfoToolTip;