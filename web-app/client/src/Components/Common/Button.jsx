import React from 'react';

const Button = ({ name, onClick, type, className='' }) => {
  return (
    <button className= {` ${className} px-3 py-2  rounded-[10px]  transition-all duration-300 cursor-pointer`}
    onClick={onClick}
    type={type}>
      {name}
    </button>
  );
};

export default Button;
