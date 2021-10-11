import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="change-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input
        type="url"
        id="link-of-avatar"
        className="popup__field popup__field_change-avatar popup__field_link"
        name="link"
        placeholder="Ссылка на картинку"
        required
        ref={avatarRef}
      />
      <span className="error" id="link-of-avatar-error"></span>
      <button type="submit" className="popup__button popup__save-button">
        Сохранить
      </button>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;