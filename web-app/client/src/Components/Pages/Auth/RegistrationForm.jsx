import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthFormTitle from '../../Common/AuthFormTitle';
import Button from '../../Common/Button';
import Input from '../../Common/Input';
import axios from 'axios';

const RegistrationForm = () => {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repPassword, setRepPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
  
    // Валидация
    if (!login || !email || !password || !repPassword || !checked) {
      setError("Все поля должны быть заполнены");
      setLoading(false);
      return;
    }
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Введите корректный email");
      setLoading(false);
      return;
    }
  
    if (password !== repPassword) {
      setError("Пароли не совпадают");
      setLoading(false);
      return;
    }
  
    try {
      // Отправка данных на сервер через axios
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        login,
        email,
        password,
      });
  
      // Проверка успешного ответа
      if (response.status === 201) {
        // Вывод сообщения об успешной регистрации
        setSuccess("Поздравляем!!! Вы зарегистрированы!!!");
        // Через 2 секунды перенаправляем на MainPage
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(response.data.message || 'Неизвестная ошибка');
      }
    } catch (error) {
      // Обработка ошибок
      if (error.response) {
        setError(error.response.data.message || error.message);
      } else {
        setError(error.message);
      }
    } finally {
      // Очищаем форму только при успешной регистрации
      setLoading(false);
    }
  };

  const handleChangeLogin = (event) => setLogin(event.target.value);
  const handleChangeEmail = (event) => setEmail(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);
  const handleChangeRepPassword = (event) => setRepPassword(event.target.value);
  const handleClosePage = () => navigate('/');
  const handleFormClick = (event) => event.stopPropagation();
  const handleCheckboxChange = () => setChecked(!checked);

  return (
    <div onClick={handleClosePage} className='flex-1 flex flex-col items-center justify-center p-4'>
      <form onClick={handleFormClick} onSubmit={handleSubmit} className=' flex flex-col items-center gap-6 shadow-lg p-15  bg-white rounded-md absolute'>
        <AuthFormTitle title='Регистрация' />

        {error && <div className='text-lg text-center font-medium text-red-500 underline'>{error}</div>}
        {success && <div className='text-lg font-medium text-green-500 underline'>{success}</div>}

        <Input onChange={handleChangeLogin} type='text' value={login} placeholder='Логин' />
        <Input onChange={handleChangeEmail} type='email' value={email} placeholder='Email' />
        <Input onChange={handleChangePassword} type='password' value={password} placeholder='Пароль' />
        <Input onChange={handleChangeRepPassword} type='password' value={repPassword} placeholder='Повторите пароль' />

        <label className='w-[290px] flex text-[12px] text-orange'>
          <Input type='checkbox' checked={checked} onChange={handleCheckboxChange} className='hidden' />
          <span className={`flex items-center justify-center w-5 h-5 border-2 ${checked ? 'border-orange' : 'border-light-blue'} rounded-md mr-2`}>
            {checked && <span className='w-3 h-3 bg-orange rounded-md'></span>}
          </span>
          согласие на обработку персональных данных
        </label>

        <div className='flex justify-center gap-3.5'>
          <Button name={loading ? 'Загрузка...' : 'Зарегистрироваться'} className=' bg-dark-blue text-white hover:text-orange px-5 '/>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;