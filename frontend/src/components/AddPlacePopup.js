import React, {useState, useEffect, useRef} from 'react';
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const [place, setPlace] = useState('');
    const [link, setLink] = useState('');

    useEffect(()=>{
        setPlace('');
        setLink('');
    },[isOpen]);

    function handleSubmit(e){
        e.preventDefault();

        onAddPlace({
            place:place,
            link:link,
        });
    }
    function handleSetPlace(e) {
        setPlace(e.target.value);
    }

    function handleSetLink(e) {
        setLink(e.target.value);
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            name={"add"}
            closePopup={onClose}
            title={"Новое место"}
            children={<>
                <div className="popup__input-container">
                    <input onChange={handleSetPlace} type="text" className="popup__input popup__input_type_place" id="card-name"
                           name="place" required
                           minLength="2" maxLength="30" placeholder="Название" value={place || ''}/>
                    <span id="card-name-error" className="popup__error"></span>
                </div>
                <div className="popup__input-container">
                    <input onChange={handleSetLink} type="url" className="popup__input popup__input_type_link" id="card-url"
                           name="link"
                           placeholder="Ссылка на картинку" value={link || ''} required/>
                    <span id="card-url-error" className="popup__error"></span>
                </div>
            </>
            }
            buttonType={"create"}
            buttonContent={"Создать"}
            onSubmit={handleSubmit}
        />
    )
}

export default AddPlacePopup;