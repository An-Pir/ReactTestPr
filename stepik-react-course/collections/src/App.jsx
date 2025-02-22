import React, { Component } from "react";
import "./App.css";
import Books from "./components/Books";

class App extends Component {
  state = {
    books: [
      { id: "1a", name: "Война и мир" },
      { id: "2a", name: "1984" },
      { id: "3a", name: "Мы" },
      { id: "4a", name: "Ревизор" },
    ],
  };

  removeBooks = (id) => {
    this.setState({books: this.state.books.filter((book) => book.id !== id)})
  }

  render() {

    const {books} = this.state

    return <div className="App">
     <Books books={books} removeBooks={this.removeBooks}/>
    </div>;
  }
}

export default App;
