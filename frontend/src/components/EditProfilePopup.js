import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-form"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input
        type="text"
        id="name-card"
        className="popup__field popup__field_name popup__field_edit-form"
        name="name"
        placeholder="Имя"
        required
        value={name}
        onChange={handleChangeName}
      />
      <span className="error" id="name-card-error">
        {" "}
      </span>
      <input
        type="text"
        id="about-myself"
        className="popup__field popup__field_about popup__field_edit-form"
        name="about-myself"
        placeholder="О себе"
        required
        value={description}
        onChange={handleChangeDescription}
      />
      <span className="error" id="about-myself-error">
        {" "}
      </span>
      <button type="submit" className="popup__button popup__save-button">
        {" "}
        Сохранить{" "}
      </button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;