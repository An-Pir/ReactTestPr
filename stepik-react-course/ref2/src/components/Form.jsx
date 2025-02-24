import React, { Component } from "react";

class Form extends Component {
  constructor() {
    super();

    this.cardRef = React.createRef();
    this.buttonRef = React.createRef();
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.cardRef.current.value = this.formatCardNumber(value);

    const cardNumber = this.cardRef.current.value.replace(/\D/g, "");
    if (cardNumber.length === 16) {
      this.buttonRef.current.focus();
    } 
  };

  formatCardNumber = (value) => {
    const cleanedValue = value.replace(/\D/g, "");
    return cleanedValue.replace(/(.{4})/g, "$1 ").trim();
  };

  handleClick = () => {
    alert('номер карты добавлен')
  };

  render() {
    return (
      <div>
        <input
          type="text"
          name="card"
          placeholder="XXXX XXXX XXXX XXXX"
          onChange={this.handleChange}
          ref={this.cardRef}
        />
        <button type="button" ref={this.buttonRef} onClick={this.handleClick}>
          Подтвердить
        </button>
      </div>
    );
  }
}

export default Form;
