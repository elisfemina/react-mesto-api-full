import React, { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithForm from "./PopupWithForm";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";

function App() {
  const history = useHistory();

  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    about: "",
    avatar: "",
  });
  const [userEmail, settUserEmail] = React.useState("");
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isTooltipOpened, setIsTooltipOpened] = useState(false);
  const [isSuccessAuth, setIsSuccessAuth] = useState(false);

  React.useEffect(() => {
    //получение данных о пользователе и карточках из сервера
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cardList, res]) => {
        setCards(cardList);
        setCurrentUser(res);
      })
      .catch((err) => console.log(err));
  }, []);

  //проверка токена
  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn]);

  //лайк карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some(
      (element) => element._id === currentUser._id
    ); // Проверяем, есть ли уже лайк на этой карточке
    api
      .changeLikeCardStatus(card._id, !isLiked) // Отправляем запрос в API и получаем обновлённые данные карточки
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  //удаление карточки
  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  // открытие попапа картинки
  function handleCardClick({ name, link }) {
    setImagePopupOpen(true);
    setSelectedCard({ name, link });
  }

  // открытие попапа добавления картинки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  // открытие попапа редактирования данных профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  // открытие попапа изменения аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  // открытие попапа с информацией о регистрации
  function openInfoPopup() {
    setIsTooltipOpened(true);
  }

  //закрытие попапов
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
  }

  //закрытие попапа с информацией о регистрации
  function closeInfoPopup() {
    setIsTooltipOpened(false);
  }

  //обновление информации пользователя
  function handleUpdateUser(data) {
    api
      .editInfo(data)
      .then((res) => setCurrentUser(res))
      .catch((err) => console.log(err))
      .finally(() => closeAllPopups());
  }

  //обновление аватара пользователя
  function handleUpdateAvatar(data) {
    api
      .updateAvatar(data.avatar)
      .then((res) => setCurrentUser(res))
      .catch((err) => console.log(err))
      .finally(() => closeAllPopups());
  }

  //добавление новой карточки через форму
  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => setCards([newCard, ...cards]))
      .catch((err) => console.log(err))
      .finally(() => closeAllPopups());
  }

  //регистрация
  const handleRegister = (data) => {
    const { password, email } = data;
    return auth
      .register({ password, email })
      .then((res) => {
        //if (!res || res.statusCode === 400) throw new Error('Что-то пошло не так');
        setIsSuccessAuth(true);
        openInfoPopup();
        history.push("/sign-in");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsSuccessAuth(false);
        openInfoPopup();
      });
  };

  //авторизация
  const handleLogin = (data) => {
    const { password, email } = data;
    return auth
      .login({ password, email })
      .then((data) => {
        if (!data) throw new Error("Неверные имя пользователя или пароль");
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          tokenCheck();
          history.push("/");
        } else {
          localStorage.removeItem("jwt");
          history.push("/sign-in");
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  };

  // Выход
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/sign-in");
  };

  //проверка токена
  const tokenCheck = () => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth
        .getToken(jwt)
        .then((res) => {
          settUserEmail(res.data.email);
          setLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route path="/sign-in">
            <Login
              email={userEmail}
              text={"Регистрация"}
              onLogin={handleLogin}
            />
          </Route>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            email={userEmail}
            loggedIn={loggedIn}
            text={"Выйти"}
            onClick={handleLogout}></ProtectedRoute>
          <Route path="/sign-up">
            <Register
              email={userEmail}
              text={"Войти"}
              onRegister={handleRegister}
            />
          </Route>
        </Switch>

        {/*попап редактирования данных профиля*/}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        {/*попап изменения аватара*/}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        {/*попап добавления картинки*/}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        {/*попап открытия картинки*/}
        <ImagePopup
          className="popup popup-photo"
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}></ImagePopup>

        {/*попап удаления карточки*/}
        <PopupWithForm name="delete-card" title="Вы уверены?"></PopupWithForm>

        {/*попап об успешной/неуспешной регистрации*/}
        <InfoTooltip
          isOpen={isTooltipOpened}
          onClose={closeInfoPopup}
          name="tooltip"
          auth={isSuccessAuth}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
