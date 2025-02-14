import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    count: 0,
  };
  incrementClickHandler = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };
  decrementHandleClick = () => {
    this.setState((prevState) => ({ count: prevState.count - 1 }));
  };
  resetClickHandler = () => {
    this.setState({ count: 0 });
  };

  render() {
    return (
      <div className="App">
        <div className="btn-wrap">
          <button onClick={this.incrementClickHandler}>+</button>
          <p>{this.state.count}</p>
          <button onClick={this.decrementHandleClick}>-</button>
        </div>
        <button onClick={this.resetClickHandler}>reset</button>
      </div>
    );
  }
}

export default App;
