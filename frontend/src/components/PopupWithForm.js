import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}>
      <div className={`popup__container popup__container_${props.name}`}>
        <h2 className={`popup__heading popup__heading_${props.name}`}>
          {props.title}
        </h2>
        <button
          type="button"
          className={`popup__close-button popup__close-button_${props.name}`}
          onClick={props.onClose}></button>
        <form
          className={`popup__form popup__form_${props.name}`}
          name={props.name}
          noValidate
          onSubmit={props.onSubmit}>
          {props.children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;