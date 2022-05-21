import React, {useState, useEffect} from 'react';
import {useHistory, Route, Link, Navigate, Routes, Router, useNavigate} from 'react-router-dom';
import Header from '../components/Header.js';
import MainPage from '../components/MainPage.js';
import Footer from "./Footer.js";
import api from "../utils/Api";
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import Register from '../components/Register.js';
import Login from '../components/Login.js';
import ProtectedRoute from "../components/ProtectedRoute.js";
import auth from "../utils/Auth.js";
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
    const [currentUser, setCurrentUser] = useState({});
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
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        }).catch((err) => console.log(err));
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id).then(() => {
            setCards((state) => state.filter((c) => c._id !== card._id));
        }).catch((err) => console.log(err));
    }

    function handleUpdateUser(user) {
        api.patchUserInfo(user).then(res => {
            setCurrentUser(res);
            closeAllPopups();
        }).catch((err) => {
            console.log(err);
        })
    }

    function handleUpdateAvatar(user) {
        api.setUserAvatar(user.avatar).then(res => {
            setCurrentUser(res);
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

    useEffect(() => {
        getContent();
    }, [loggedIn]);

    useEffect(() => {
        if (!loggedIn) {
            return
        }
        console.log("useEffect");
        // api.getInitialCards()
        //     .then(
        //         (data) => {
        //             console.log(data);
        //             setCards(data.data);
        //         }
        //     )
        //     .catch(err => console.log(err))

        api.getUserInfo()
            .then(
                (userInfo) => {
                    console.log("user",userInfo);
                    setCurrentUser(userInfo.data);
                }
            )
            .catch(err => console.log(err))
    }, [loggedIn])

    function handleLoggedIn() {
        setLoggedIn(true);
        history('/users/me');
    }

    function handleLoggedOut() {
        history('/signin');
        setLoggedIn(false);
    }

    function getContent() {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjg4YmUyMDk1M2I1ZjE4MGRhZWIwZWQiLCJpYXQiOjE2NTMxMjg3NDIsImV4cCI6MTY1MzczMzU0Mn0.v_yN5aeJ-AZqywPr-y67Y-Satqo0NCTh-BYcGdIbpLI";
        console.log(token);
        if (token) {
            auth.getMain(token).then((res) => {
                setLoggedIn(true);
                history('/users/me');
                setEmail(res.data.email);
            })
        }
    }

    function handleRegister(email,password) {
        return auth.register(email, password).then((res) => {
            if (res.data) {
                setStatus(true);
                setInfoTooltipOpen(true);
                return res;
            }
            else{
                setStatus(false);
                setInfoTooltipOpen(true);
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    function handleLogin(email, password) {
        console.log("handleLogin", email, password);
        return auth.authorize(email, password).then((res)=>{
            if (res['message']==='success'){
                handleLoggedIn();
            }
            else{
                setStatus(false);
                setInfoTooltipOpen(true);
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

    function handleClose(){
        setInfoTooltipOpen(false);
        if (status){
            history('/signin');
        }
    }

    // useEffect(() => {
    //     console.log("another useEffect")
    //     if (loggedIn) {
    //         Promise.all([api.getUserInfo(), api.getInitialCards()]).then(([user, c]) => {
    //             console.log(user);
    //             setCurrentUser(user);
    //             setCards(c);
    //             console.log(currentUser, user);
    //         }).catch(err => {
    //             console.log(err);
    //         });
    //     }
    // }, [loggedIn]);


    useEffect(() => {
        function handleEscapeClose(event) {
            if (event.code === 'Escape') {
                closeAllPopups();
            }
        }

        document.addEventListener('keydown', handleEscapeClose)
        return () => document.removeEventListener('keydown', handleEscapeClose)
    });

    return (
        <div className="App">
            <div className="page">
                <Header email={email} handleSignOut={handleLoggedOut}/>
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
