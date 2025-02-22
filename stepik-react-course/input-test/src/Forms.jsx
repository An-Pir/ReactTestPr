import React, { Component } from "react";

class Forms extends Component {
  state = {
    email: "",
    subscription: false,
  };

  handleChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handleCheckboxChange = (event) => {
    this.setState({ subscription: event.target.checked });
  };

  handleForm = (event) => {
    event.preventDefault();
  };

  handleSubmit = () => {
    const isValidEmail =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        this.state.email.toLocaleLowerCase()
      );
    const isValidCheckBox = this.state.subscription;
    if (!isValidEmail || !isValidCheckBox) {
      alert("Заполните форму и согласие");
      return;
    }
    this.setState({ email: "", subscription: false });

    alert("Вы подписаны");
  };
    
  render() {
    const { email, subscription } = this.state;
    return (
      <div>
        <form onSubmit={this.handleForm}>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="email"
            onChange={this.handleChange}
          />
          Email
          <br />
          <label>
            <input
              type="checkbox"
              id="subscription"
              name="subscription"
              checked={subscription}
              onChange={this.handleCheckboxChange}
            />
            я хочу получать рассылку
          </label>
          <br />
          <button type="submit" onClick={this.handleSubmit}>
            Отправить
          </button>
        </form>
      </div>
    );
  }
}

export default Forms;
