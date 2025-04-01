import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Common/Button';
import Input from '../../Common/Input';
import AuthFormTitle from '../../Common/AuthFormTitle';

const LoginForm = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChangeLogin = (event) => {
    setLogin(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleReset = () => {
    setLogin('');
    setPassword('');
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

  } 

  const handleClosingPage = () => {
    navigate('/');
  };

  const handleFormClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div
      onClick={handleClosingPage}
      className='flex-1 flex flex-col items-center justify-center'
    >
      <form
        onClick={handleFormClick}
        onSubmit={handleSubmit}
        className='flex flex-col gap-4 shadow-lg p-10 bg-white rounded-md absolute'
      >
        <AuthFormTitle title='Авторизация' />

        {error && <p className='text-red-500'>{error}</p>}

        <Input
          onChange={handleChangeLogin}
          type='text'
          value={login}
          placeholder='Логин'
          required
        />

        <Input
          onChange={handleChangePassword}
          type='password'
          value={password}
          placeholder='Пароль'
          required
        />

        <div className='flex justify-between gap-3.5'>
          <Button name={loading ? 'Загрузка...' : 'Войти'} disabled={loading} />
          <Button onClick={handleReset} name='Сбросить' type='button' />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;