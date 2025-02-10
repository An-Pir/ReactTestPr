import React from "react";
import "./Navigation.css";
import Link from "./Link";

const Navigation = () => {
  

  return (
    <nav className="nav">
      <Link exact to={'/'} namePage="Главная" />
      <Link to={'/reg'} namePage="Регистрация"/>
      <Link to={'/login'} namePage="Вход"/>
    </nav>
  );
};

export default Navigation;
