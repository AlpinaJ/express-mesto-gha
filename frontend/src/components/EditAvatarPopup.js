import React, {useState, useEffect, useRef} from 'react';
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const avatarReference = useRef();

    useEffect(()=>{
        avatarReference.current.value = '';
    },[isOpen]);

    function handleSubmit(e){
        e.preventDefault();

        onUpdateAvatar({
            avatar:avatarReference.current.value,
        });
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            name={"avatar"}
            closePopup={onClose}
            title={"Обновить аватар"}
            children={<>
                <input type="url" className="popup__input popup__input_type_link" id="avatar-url"
                       name="link"
                       placeholder="Ссылка на картинку" ref={avatarReference} required/>
                <span id="avatar-url-error" className="popup__error"></span>
            </>}
            buttonType={"change"}
            buttonContent={"Сохранить"}
            onSubmit={handleSubmit}
        />
    )
}

export default EditAvatarPopup;
