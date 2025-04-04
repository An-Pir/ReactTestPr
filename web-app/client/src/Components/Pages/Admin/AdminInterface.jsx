import React, { useState, useEffect } from 'react';
import Input from '../../Common/Input';
import Button from '../../Common/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminInterface = () => {
  const [calculators, setCalculators] = useState([]); // Список калькуляторов
  const navigate = useNavigate();

  // Состояния для добавления нового калькулятора
  const [newProductName, setNewProductName] = useState('');
  const [newInterestRate, setNewInterestRate] = useState('');

  // Состояния для редактирования
  const [editingId, setEditingId] = useState(null);
  const [editedProductName, setEditedProductName] = useState('');
  const [editedInterestRate, setEditedInterestRate] = useState('');

  // Загрузка калькуляторов из базы данных при монтировании компонента
  useEffect(() => {
    const fetchCalculators = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/calculators'
        );
        setCalculators(response.data);
      } catch (error) {
        console.error('Ошибка при получении калькуляторов:', error);
      }
    };

    fetchCalculators();
  }, []);

  // Функция добавления нового калькулятора
  const handleAdd = async () => {
    if (!newProductName || !newInterestRate) return;

    const newCalc = {
      productName: newProductName,
      interestRate: parseFloat(newInterestRate),
    };

    try {
      const response = await axios.post(
        'http://localhost:5000/api/calculators',
        newCalc
      );
      // Обновляем список калькуляторов, добавив вновь созданный объект из базы данных
      setCalculators([...calculators, response.data]);
      setNewProductName('');
      setNewInterestRate('');
    } catch (error) {
      console.error('Ошибка при добавлении калькулятора:', error);
    }
  };

  // Функция для перехода в режим редактирования выбранного калькулятора
  const handleEdit = (calc) => {
    setEditingId(calc._id || calc.id);
    setEditedProductName(calc.productName);
    setEditedInterestRate(calc.interestRate);
  };

  // Функция обновления данных калькулятора
  const handleUpdate = async () => {
    const updatedCalc = {
      productName: editedProductName,
      interestRate: parseFloat(editedInterestRate),
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/api/calculators/${editingId}`,
        updatedCalc
      );
      setCalculators(
        calculators.map((calc) =>
          (calc._id || calc.id) === editingId ? response.data : calc
        )
      );
      setEditingId(null);
      setEditedProductName('');
      setEditedInterestRate('');
    } catch (error) {
      console.error('Ошибка при обновлении калькулятора:', error);
    }
  };

  // Функция удаления калькулятора
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/calculators/${id}`);
      setCalculators(
        calculators.filter((calc) => (calc._id || calc.id) !== id)
      );
    } catch (error) {
      console.error('Ошибка при удалении калькулятора:', error);
    }
  };

  // Функция полного выхода из административного интерфейса
  const handleLogout = () => {
    // Удаляем токен из localStorage (если он там хранится)
    localStorage.removeItem('token');
    // Можно удалить и другие сохранённые данные, если они есть

    // Перенаправляем пользователя на страницу логина или главную страницу
    navigate('/login');
  };

  return (
    <div className='container m-auto flex-1 flex flex-col items-center p-4'>
      <h2 className='text-3xl text-center font-bold py-8 text-dark-blue'>
        Административный интерфейс управления калькуляторами
      </h2>

      {/* Форма добавления нового калькулятора */}
      <div className=' flex flex-col gap-5 justify-center text-dark-blue bg-gray-100 w-full py-12'>
        <h3 className=' text-center text-2xl font-medium  underline'>
          Добавить калькулятор
        </h3>
        <div className=' flex flex-wrap justify-center gap-5'>
          <div className='  flex gap-5 flex-wrap justify-center'>
            <Input
              type='text'
              placeholder='Название банковского продукта'
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
              className='border p-2  rounded '
            />
            <Input
              type='number'
              placeholder='Процентная ставка'
              value={newInterestRate}
              onChange={(e) => setNewInterestRate(e.target.value)}
              className='border p-2  rounded '
            />
          </div>
          <div>
            <Button
              onClick={handleAdd}
              className='bg-dark-blue text-white hover:text-orange'
              name='Добавить'
            />
          </div>
        </div>
      </div>

      {/* Список калькуляторов */}
      <div className='bg-gray-200 w-full py-7 mb-10'>
        <h3 className='text-2xl text-center font-medium mb-2 text-dark-blue underline'>
          Список калькуляторов
        </h3>
        {calculators.length === 0 ? (
          <p className='text-center text-lg text-orange font-medium'>
            Нет добавленных калькуляторов
          </p>
        ) : (
          <ul>
            {calculators.map((calc) => (
              <li
                key={calc._id || calc.id}
                className='text-xl text-dark-blue border-b py-3 px-3 flex justify-center flex-wrap'
              >
                {editingId === (calc._id || calc.id) ? (
                  // Режим редактирования
                  <div className='flex   flex-wrap justify-center gap-5'>
                    <div className=' flex gap-5 justify-center flex-wrap'>
                      <Input
                        type='text'
                        value={editedProductName}
                        onChange={(e) => setEditedProductName(e.target.value)}
                        className='border p-1 rounded '
                      />
                      <Input
                        type='number'
                        value={editedInterestRate}
                        onChange={(e) => setEditedInterestRate(e.target.value)}
                        className='border p-1 rounded '
                      />
                    </div>
                    <div className=' flex gap-5 justify-center flex-wrap'>
                      <Button
                        onClick={handleUpdate}
                        name='Сохранить'
                        className='bg-dark-blue text-white hover:text-orange '
                      />
                      <Button
                        onClick={() => setEditingId(null)}
                        name='Отмена'
                        className='bg-gray-500 text-white hover:bg-white hover:text-orange '
                      />
                    </div>
                  </div>
                ) : (
                  // Отображение данных калькулятора
                  <div className='w-full flex flex-col md:flex-row items-center justify-between gap-5'>
                    <span>
                      <strong>{calc.productName}</strong> — {calc.interestRate}%
                    </span>
                    <div className='flex gap-6'>
                      <Button
                        onClick={() => handleEdit(calc)}
                        name='Редактировать'
                        className='bg-dark-blue text-white hover:text-orange'
                      />
                      <Button
                        onClick={() => handleDelete(calc._id || calc.id)}
                        name='Удалить'
                        className='bg-white text-red-500  hover:bg-red-500 hover:text-white'
                      />
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Button
        onClick={handleLogout}
        className='bg-red-400 text-white hover:bg-white hover:text-red-400  '
        name='Выйти из админпанели'
      />
    </div>
  );
};

export default AdminInterface;
