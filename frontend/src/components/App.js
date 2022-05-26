import React, {useState, useEffect} from 'react';
import {useHistory, Route, Link, Navigate, Routes, Router, useNavigate} from 'react-router-dom';
import Header from '../components/Header.js';
import MainPage from '../components/MainPage.js';
import Footer from "./Footer.js";
import api from "../utils/Api";
import Register from '../components/Register.js';
import Login from '../components/Login.js';
import ProtectedRoute from "../components/ProtectedRoute.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import InfoToolTip from "./InfoTooltip";

function App() {
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCards] = useState({});
    const [currentUser, setCurrentUser] = useState({
        "avatar": "",
        "about": "",
        "email": "",
        "name": ""
    });
    const [cards, setCards] = useState([]);

    const handleEditAvatarClick = () => setEditAvatarPopupOpen(true);
    const handleEditProfileClick = () => setEditProfilePopupOpen(true);
    const handleAddPlaceClick = () => setAddPlacePopupOpen(true);
    const handleCardClick = (card) => setSelectedCards(card);


    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const history = useNavigate();
    const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
    const [status, setStatus] = useState();

    function closeAllPopups() {
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setSelectedCards({});
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked).then((res) => {
            let newCard = res["data"];
            let newCards = cards.map((c) => c._id === card._id ? newCard : c);
            setCards(newCards);
        }).catch((err) => console.log(err));
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id).then(() => {
            setCards((state) => state.filter((c) => c._id !== card._id));
        }).catch((err) => console.log(err));
    }

    function handleUpdateUser(user) {
        api.patchUserInfo(user).then(res => {
            setCurrentUser(userFromRes(res));
            closeAllPopups();
        }).catch((err) => {
            console.log(err);
        })
    }

    function handleUpdateAvatar(user) {
        api.setUserAvatar(user.avatar).then(res => {
            setCurrentUser(userFromRes(res));
            closeAllPopups();
        }).catch((err) => {
            console.log(err);
        })
    }

    function handleAddPlace(card) {
        api.postCard(card).then(res => {
            setCards([res, ...cards]);
            closeAllPopups();
        }).catch((err) => {
            console.log(err);
        })
    }

    function userFromRes(res) {
        return res["data"] !== undefined ? res["data"] : currentUser;
    }

    useEffect(() => {
        console.log("loggedIn changed");
        if (loggedIn) {
            console.log("loggedIn true");
            Promise.all([api.getUserInfo(), api.getInitialCards()])
                .then(values => {

                    setCurrentUser(userFromRes(values[0]));

                    if (values[1]["data"] !== undefined) {
                        let newCards = values[1]["data"]
                        setCards(newCards);
                    }

                    history('/users/me');
                }).catch(err => {
                console.error(err);
            });
        }
    }, [loggedIn]);


    function handleLoggedIn() {
        setLoggedIn(true);
        // history('/users/me');
    }

    function handleLoggedOut() {
        setLoggedIn(false);
        api.signout().then(() => {
            history('/signin');
        }).catch((err) => console.log(err));
    }


    function handleRegister(email, password) {
        return api.signup({email, password}).then((res) => {
            if (res.data) {
                setStatus(true);
                setInfoTooltipOpen(true);
                return res;
            } else {
                setStatus(false);
                setInfoTooltipOpen(true);
            }
        }).catch((err) => {
            setStatus(false);
            setInfoTooltipOpen(true);
            console.log(err);
        })
    }

    function handleLogin(email, password) {
        tokenCheck();
        return api.signin({email, password}).then((res) => {
            if (res['message'] === 'success') {
                handleLoggedIn();
            } else {
                setStatus(false);
                setInfoTooltipOpen(true);
            }
        }).catch((err) => {
            setStatus(false);
            setInfoTooltipOpen(true);
            console.log(err);
        })
    }

    function handleClose() {
        setInfoTooltipOpen(false);
        if (status) {
            history('/signin');
        }
    }

    function tokenCheck() {
        console.log("we are in token check", loggedIn);
        api.getUserInfo()
            .then((res) => {
                setLoggedIn(true);
            })
            .catch((err) => {
                console.log(err);
            });
    }


    useEffect(() => {
        function handleEscapeClose(event) {
            if (event.code === 'Escape') {
                closeAllPopups();
            }
        }

        document.addEventListener('keydown', handleEscapeClose)
        return () => document.removeEventListener('keydown', handleEscapeClose)
    });

    useEffect(() => {
        tokenCheck();
    }, [history]);

    return (
        <div className="App">
            <div className="page">
                <Header email={currentUser.email} handleSignOut={handleLoggedOut}/>
                <Routes>
                    <Route path="/signup" element={<Register onRegister={handleRegister}/>}/>
                    <Route path="/signin" element={<Login onLogin={handleLogin}/>}/>
                    <Route exact path="/" element=
                        {loggedIn ? <Navigate to="/signup"/> : <Navigate to="/signin"/>}
                    />
                    <Route path="/users/me" element={<ProtectedRoute isLoggedIn={loggedIn}><MainPage
                        currentUser={currentUser}
                        handleAddPlaceClick={handleAddPlaceClick}
                        handleCardClick={handleCardClick}
                        handleCardDelete={handleCardDelete}
                        handleCardLike={handleCardLike}
                        handleEditAvatarClick={handleEditAvatarClick}
                        handleEditProfileClick={handleEditProfileClick}
                        mainCards={cards}
                    /></ProtectedRoute>}/>
                </Routes>
                <Footer/>
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                                  onUpdateUser={handleUpdateUser}/>
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                                 onUpdateAvatar={handleUpdateAvatar}/>
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace}/>
                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />
                <div className="popup popup_type_delete">
                    <div className="popup__overlay"></div>
                    <div className="popup__container">
                        <button className="popup__button-close" type="button"></button>
                        <h3 className="popup__title">Вы уверенны?</h3>
                        <button type="button" className="popup__button popup__button-confirm">Да</button>
                    </div>
                </div>
                <InfoToolTip status={status} isOpen={isInfoTooltipOpen} closePopup={handleClose}/>
            </div>
        </div>


    );
}

export default App;
