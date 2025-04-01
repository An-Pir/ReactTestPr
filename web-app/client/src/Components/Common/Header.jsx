import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logoText.png';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleButtonLoginClick = () => {
    navigate('/login');
  };
  const handleButtonRegisterClick = () => {
    navigate('/registration');
  };

  return (
    <header className=' h-14.5'>
      <div className=' container mx-auto flex flex-wrap justify-between gap-5 items-center '>
        <Link to='/'>
          <img src={logo} alt='Логотип банка' className='h-18' />
        </Link>

        <div className=' flex gap-5 flex-wrap'>
          {location.pathname !== '/login' && location.pathname !== '/registration' && (
            <>
              <Button name='Войти' onClick={handleButtonLoginClick} />
              <Button
                name='Зарегистрироваться'
                onClick={handleButtonRegisterClick}
              />
            </>
          )}
        </div>
      </div>
      <hr className=' h-0.5 bg-light-blue ' />
    </header>
  );
};

export default Header;
