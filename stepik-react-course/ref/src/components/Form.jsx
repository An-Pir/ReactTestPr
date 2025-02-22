import React, { Component } from "react";

class Form extends Component {
  constructor() {
    super();
    
    this.state = {
      card: "", // Инициализация состояния card
    };
    this.carRef = React.createRef();
    this.buttonRef = React.createRef();

  }

  handleChange = (event) => {
    const value = event.target.value.replace(/\D/g, ""); // Удаляем все нецифровые символы
    const formattedValue = value.replace(/(.{4})/g, "$1 ").trim(); // Форматируем в группы по 4 цифры
    this.setState({ card: formattedValue }); // Сохраняем значение в состоянии

    if (value.length === 16) {
      this.buttonRef.current.focus();
    }
  };

  handleClick = () => {
    const { card } = this.state; // Извлечение значения из состояния

    // Удаляем пробелы для проверки длины
    const cardNumber = card.replace(/\s/g, "");

    if (cardNumber.length === 16) {
      if (!/^\d+$/.test(cardNumber)) { // Проверка на наличие только чисел
        alert("Номер карты может состоять только из чисел");
        return;
      }
      
      alert("Успешно");
      this.setState({ card: "" }); // Сброс состояния
    } else {
      alert("Номер карты должен содержать 16 цифр");
    }
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="XXXX XXXX XXXX XXXX"
          value={this.state.card} // Используем значение из состояния
          onChange={this.handleChange} // Добавляем обработчик изменения
          ref={this.carRef}
        />
        <button type="button" onClick={this.handleClick} ref={this.buttonRef}>
          Подтвердить
        </button>
      </div>
    );
  }
}

export default Form;