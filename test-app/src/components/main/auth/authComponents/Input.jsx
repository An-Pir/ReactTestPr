import React from "react";

const Input = (props) => {

  return (
    <input
      type={props.type}
      id={props.id}
      placeholder={props.placeholder}
      className={props.className}
      value={props.value}
      checked={props.checked}
      onChange={props.onChange}
      required={props.required}
    />
  );
};

export default Input;
