import React, {useState, useEffect} from 'react';
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function MainPage({currentUser, handleAddPlaceClick, handleCardClick, handleCardDelete, handleCardLike, handleEditAvatarClick, handleEditProfileClick, mainCards}) {
    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Main onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={mainCards}
            />
        </CurrentUserContext.Provider>
    )
}

export default MainPage;