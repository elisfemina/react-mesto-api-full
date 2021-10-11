import React from "react";
import Card from "./Card";
import Header from "./Header";
import Footer from "./Footer";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <Header
        onClick={props.onClick}
        loggedIn={props.loggedIn}
        email={props.email}
        text={props.text}
        link="/sign-up"
      />
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-container">
            <img
              className="profile__avatar"
              src={`${currentUser.avatar}`}
              alt="Фото профиля"
            />
            <button
              className="profile__avatar-button"
              onClick={props.onEditAvatar}
              type="button"></button>
          </div>
          <div className="profile__info-wrapper">
            <div className="profile__info-inner">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                onClick={props.onEditProfile}
                type="button"></button>
            </div>
            <p className="profile__text">{currentUser.about}</p>
          </div>
          <button
            className="profile__add-button"
            onClick={props.onAddPlace}
            type="button"></button>
        </section>

        <section className="elements">
          {props.cards.map((card) => (
            <Card
              card={card}
              onCardClick={props.onCardClick}
              key={card._id}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Main;