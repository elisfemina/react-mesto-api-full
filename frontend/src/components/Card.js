import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `element__remove-button ${
    isOwn ? "" : "element__remove-button_invisible"
  }`;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__vector ${
    isLiked ? "element__vector_active" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="element">
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}></button>
      <img
        className="element__image"
        src={`${card.link}`}
        alt={`${card.name}`}
        onClick={handleClick}
      />
      <div className="element__wrapper">
        <h2 className="element__text">{card.name}</h2>
        <div className="element__block-with-likes">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}></button>
          <p className="element__number-of-likes">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
