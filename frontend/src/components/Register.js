import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function Register({ email, text, onRegister }) {
  const [data, setData] = React.useState({ email: "", password: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(data);
  }

  return (
    <>
      <Header email={email} text={text} link="/sign-in" />
      <section className="register">
        <h2 className="form__title">Регистрация</h2>
        <form onSubmit={handleSubmit} className="form">
          <input
            required
            onChange={handleChange}
            className="form__input"
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}></input>
          <input
            required
            onChange={handleChange}
            className="form__input"
            type="password"
            name="password"
            placeholder="Пароль"
            value={data.password}></input>
          <button className="form__button form__button_register">
            Зарегистрироваться
          </button>
          <Link to="/sign-in" className="form__link">
            Уже зарегистрированы? Войти
          </Link>
        </form>
      </section>
    </>
  );
}

export default Register;