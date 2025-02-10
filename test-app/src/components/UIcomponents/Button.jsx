import React from "react";
import "./Button.css";

const Button = ({ onClick, ...props }) => {
  return (
    <button 
    onClick={onClick} 
    className="btn">
      {props.name}
    </button>
  );
};

export default Button;
