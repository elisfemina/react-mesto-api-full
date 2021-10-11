import React from "react";
import Header from "./Header";

function Login({ email, text, onLogin }) {
  const [data, setData] = React.useState({ email: "", password: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(data);
  }

  return (
    <>
      <Header email={email} text={text} link="/sign-up" />
      <section className="login">
        <h2 className="form__title">Вход</h2>
        <form onSubmit={handleSubmit} className="form">
          <input
            onChange={handleChange}
            className="form__input"
            type="email"
            name="email"
            placeholder="Email"></input>
          <input
            onChange={handleChange}
            className="form__input"
            type="password"
            name="password"
            placeholder="Пароль"></input>
          <button className="form__button form__button_login" type="submit">
            Войти
          </button>
        </form>
      </section>
    </>
  );
}

export default Login;