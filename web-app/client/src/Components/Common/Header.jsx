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
    <header className=' container m-auto mt-5 '>
      <div className=' container mx-auto flex flex-wrap justify-center sm:justify-between   items-center border-b-2 px-5 pb-5 border-dark-blue '>
        <Link to='/'>
          <img src={logo} alt='Логотип банка' className='h-20 mt-2 mx-2' />
        </Link>

        <div className=' flex justify-center  md:justify-between gap-x-3 gap-y-1.5 flex-wrap  '>
          {location.pathname !== '/login' &&
            location.pathname !== '/registration' && (
              <>
                <Button
                  name='Войти'
                  onClick={handleButtonLoginClick}
                  className=' bg-dark-blue text-white hover:text-orange px-3 text-sm sm:text-lg '
                />
                <Button
                  name='Зарегистрироваться'
                  onClick={handleButtonRegisterClick}
                  className=' bg-dark-blue text-white hover:text-orange px-3 text-sm sm:text-lg'
                />
              </>
            )}
        </div>
      </div>
    </header>
  );
};

export default Header;
