import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/header__logo.svg";

function Header({ loggedIn, email, text, link, onClick }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <div className="header__container">
        <p className="header__email">{loggedIn ? email : ""}</p>
        <Link
          onClick={onClick}
          to={link}
          className={` ${loggedIn ? "header__link_exit" : ""} header__link `}>
          {text}
        </Link>
      </div>
    </header>
  );
}

export default Header;
