import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Common/Button';
import Input from '../../Common/Input';
import AuthFormTitle from '../../Common/AuthFormTitle';
import axios from 'axios'; // Импортируем axios для работы с HTTP-запросами

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

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { login, password });
      const { token, role } = response.data; // API возвращает объект с полями token и role

      // Сохраняем токен в localStorage
      localStorage.setItem('token', token);

      if (role === 'admin') {
        navigate('/admin'); // Перенаправляем админа на страницу администратора
      } else if (role === 'user'){
        navigate('/calculator'); // Перенаправляем пользователя с ролью user на страницу банковского калькулятора
      } 
    } catch (err) {
      setError('Ошибка авторизации. Проверьте логин и пароль.');
    } finally {
      setLoading(false);
    }
  };

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
        className='flex flex-col items-center gap-8 shadow-lg p-15 bg-white rounded-md absolute'
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

        <div className='flex justify-between gap-x-10'>
          <Button 
            name={loading ? 'Загрузка...' : 'Войти'} 
            disabled={loading} 
            className='bg-dark-blue text-white hover:text-orange px-5'
          />
          <Button 
            onClick={handleReset} 
            name='Сбросить' 
            className='bg-dark-blue text-white hover:text-orange px-5' 
            type='button' 
          />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;