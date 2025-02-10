import React from "react";
import "./TitleForm.css";

const TitleForm = ({ title, className }) => {
  return <h2 className={className}>{title}</h2>;
};

export default TitleForm;
