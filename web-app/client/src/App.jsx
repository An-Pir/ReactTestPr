import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './Components/Common/Footer';
import Header from './Components/Common/Header';
import MainPage from './Components/Pages/MainPage';
import LoginForm from './Components/Pages/Auth/LoginForm';
import RegistrationForm from './Components/Pages/Auth/RegistrationForm';
import AdminInterface from './Components/Pages/Admin/AdminInterface';

function App() {
  return (
    <Router>
      <div className='max-full flex flex-col h-screen'>
        <Header />
        <Routes>
          <Route path='/' exact element={<MainPage />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/registration' element={<RegistrationForm />} />
          <Route path='/admin' element={<AdminInterface />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
