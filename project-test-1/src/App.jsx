import React from 'react';
import './App.css';
import Footer from './Footer';
import Content from './Content';
import Header from './Header';

const App = () => {
  return (
    <div className='App'>
      <Header/>
      <Content/>
      <Footer/>
    </div>
  );
};

export default App;
