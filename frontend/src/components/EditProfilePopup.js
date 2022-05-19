import React, {useState, useEffect} from 'react';
import PopupWithForm from "./PopupWithForm.js";
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = React.useContext(CurrentUserContext);

    useEffect(() => {
        if(currentUser){setName(currentUser.name);
            setDescription(currentUser.about);}
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name:name,
            about: description,
        });
    }

    function handleSetName(e) {
        setName(e.target.value);
    }

    function handleSetDescription(e) {
        setDescription(e.target.value);
    }

    return (<PopupWithForm
        isOpen={isOpen}
        name={"edit"}
        closePopup={onClose}
        title={"Редактировать профиль"}
        children={<>
            <div className="popup__input-container">
                <input onChange={handleSetName} type="text" className="popup__input popup__input_type_name" id="profile-name"
                       name="name" required
                       minLength="2" maxLength="40" placeholder="Имя" value={name || ''}/>
                <span id="profile-name-error" className="popup__error"></span>
            </div>
            <div className="popup__input-container">
                <input onChange={handleSetDescription} type="text" className="popup__input popup__input_type_description"
                       id="profile-description"
                       name="description" required minLength="2" maxLength="200" placeholder="О себе"
                       value={description || ''}/>
                <span id="profile-description-error" className="popup__error"></span>
            </div>
        </>
        }
        buttonType={"save"}
        buttonContent={"Сохранить"}
        onSubmit={handleSubmit}
    />)
}

export default EditProfilePopup;