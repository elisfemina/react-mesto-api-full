import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [cardName, setCardName] = React.useState("");
  const [cardLink, setCardLink] = React.useState("");

  function handleCardNameInput(e) {
    setCardName(e.target.value);
  }
  function handleCardLinkInput(e) {
    setCardLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: cardName,
      link: cardLink,
    });
  }

  return (
    <PopupWithForm
      name="add-form"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input
        type="text"
        id="name-of-picture"
        className="popup__field popup__field_add-form popup__field_name-of-picture"
        name="name-of-picture"
        placeholder="Название"
        required
        /*minlength="2" maxlength="30"*/ value={cardName}
        onChange={handleCardNameInput}
      />
      <span className="error" id="name-of-picture-error"></span>
      <input
        type="url"
        id="link"
        className="popup__field popup__field_add-form popup__field_link"
        name="link"
        placeholder="Ссылка на картинку"
        required
        value={cardLink}
        onChange={handleCardLinkInput}
      />
      <span className="error" id="link-error"></span>
      <button type="submit" className="popup__button popup__create-button">
        Создать
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
