import React from "react";
import "./LogoComponent.css";
import logoImage from "../picture/logo.png";
import { Link } from "react-router-dom";

const LogoComponent = () => {
  return (
    <Link to={"/"}>
      <img className="logoImage" src={logoImage} alt="Logo" />
    </Link>
  );
};

export default LogoComponent;
