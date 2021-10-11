import React from "react";

function ImagePopup(props) {
  return (
    <div className={`popup popup-photo ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup-photo__container">
        <button
          type="button"
          className="popup__close-button popup-photo__close-button"
          onClick={props.onClose}></button>
        <img
          className="popup-photo__image"
          src={`${props.card.link}`}
          alt={`${props.card.name}`}
        />
        <h2 className="popup-photo__heading">{props.card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
