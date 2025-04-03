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
    <header className=' container m-auto'>
      <div className=' container mx-auto flex flex-wrap justify-between gap-5 items-center border-b-2 border-dark-blue '>
        <Link to='/'>
          <img src={logo} alt='Логотип банка' className='h-20 my-5 mx-2' />
        </Link>

        <div className=' flex gap-5 flex-wrap mx-2'>
          {location.pathname !== '/login' &&
            location.pathname !== '/registration' && (
              <>
                <Button
                  name='Войти'
                  onClick={handleButtonLoginClick}
                  className=' bg-dark-blue text-white hover:text-orange px-6 '
                />
                <Button
                  name='Зарегистрироваться'
                  onClick={handleButtonRegisterClick}
                  className=' bg-dark-blue text-white hover:text-orange px-6 '
                />
              </>
            )}
        </div>
      </div>
    </header>
  );
};

export default Header;
