import React from "react";
import "./InputWrap.css";

const InputWrap = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

export default InputWrap;
