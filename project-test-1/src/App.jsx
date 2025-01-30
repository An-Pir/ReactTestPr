import React, { Component } from "react";
import './App.css';

class App extends Component {
  state = {
    count: 1,
  };

  increment = () => {
     this.setState({ count: this.state.count + 1 });
  };

  decrement = () => {
    this.setState({count: this.state.count - 1});
  }

  reset = () => {
    this.setState({count: 0})
  }
  render() {

    const isButtonDisable = this.state.count <= 0;

    return (
      <div className="App">
        <button onClick={this.increment}>+</button>
        <span>{this.state.count}</span>
        <button onClick={this.decrement} disabled={isButtonDisable}>-</button>
        <button onClick={this.reset} disabled={isButtonDisable}>RESET</button>
      </div>
    );
  }
}

export default App;
