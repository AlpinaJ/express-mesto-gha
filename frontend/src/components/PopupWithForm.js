import React from 'react';

function PopupWithForm({isOpen, name, closePopup, title, children, buttonType, buttonContent, onSubmit}) {
    return (
        <div className={isOpen ? `popup popup_type_${name} popup_opened` : `popup popup_type_${name}`}>
            <div className="popup__overlay" onClick={closePopup}></div>
            <div className="popup__container">
                <button className="popup__button-close" type="button" onClick={closePopup}></button>
                <h3 className="popup__title">{title}</h3>
                <form onSubmit={onSubmit} className={`popup__form popup__form_type_${name}`} name={name}>
                    {children}
                    <button type="submit"
                            className={`popup__button popup__button-${buttonType}`}> {buttonContent}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;