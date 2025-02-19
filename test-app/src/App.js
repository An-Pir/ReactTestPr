import React from "react";
import Header from "./components/header/Header";
import "./App.css";
import MainPage from "./components/main/mainPage/MainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/main/auth/LoginPage";
import RegistrationPage from "./components/main/auth/RegistrationPage";
import Footer from "./components/footer/Footer";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/reg" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
