import React, { Component } from "react";

class Forms extends Component {
  state = {
    email: "",
    subscription: false,
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleCheckboxChange = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  };
  handleClick = () => {
    this.setState();
  };
  handleForm = (event) => {
    event.preventDefault();
    this.validationName();
    this.validationCheckBox();
    this.setState({ email: "", subscription: false });
  };
  validationCheckBox = () => {
    if (!this.state.subscription) {
      alert("Подтвердите ваше согласие получать рассылку");
    }
  };
  validationName = () => {
    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.state.email)
    ) {
      alert("Введите корректный Email !!!");
    }
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
          <input
            type="checkbox"
            id="subscription"
            name="subscription"
            checked={subscription}
            onChange={this.handleCheckboxChange}
          />
          <label htmlFor="subscription"> я хочу получать рассылку</label>
          <br />
          <button type="submit">Отправить</button>
        </form>
      </div>
    );
  }
}

export default Forms;
