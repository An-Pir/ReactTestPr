import React, { useState } from 'react';
import Input from '../../Common/Input';
import Button from '../../Common/Button';
import { useNavigate } from 'react-router-dom';


const AdminInterface = () => {
  const [calculators, setCalculators] = useState([]);// Список калькуляторов
  const navigate = useNavigate(); // Инициализация navigate


  // Состояния для добавления нового калькулятора
  const [newProductName, setNewProductName] = useState('');
  const [newInterestRate, setNewInterestRate] = useState('');

  // Состояния для редактирования
  const [editingId, setEditingId] = useState(null);
  const [editedProductName, setEditedProductName] = useState('');
  const [editedInterestRate, setEditedInterestRate] = useState('');

  // Функция добавления нового калькулятора
  const handleAdd = () => {
    if (!newProductName || !newInterestRate) return; // простая валидация

    const newCalc = {
      id: Date.now(), // уникальный идентификатор
      productName: newProductName,
      interestRate: newInterestRate,
    };

    setCalculators([...calculators, newCalc]);
    setNewProductName('');
    setNewInterestRate('');
  };

  // Функция для перехода в режим редактирования выбранного калькулятора
  const handleEdit = (calc) => {
    setEditingId(calc.id);
    setEditedProductName(calc.productName);
    setEditedInterestRate(calc.interestRate);
  };

  // Функция обновления данных калькулятора
  const handleUpdate = () => {
    setCalculators(
      calculators.map((calc) =>
        calc.id === editingId
          ? { ...calc, productName: editedProductName, interestRate: editedInterestRate }
          : calc
      )
    );
    // сброс состояний редактирования
    setEditingId(null);
    setEditedProductName('');
    setEditedInterestRate('');
  };

  // Функция удаления калькулятора
  const handleDelete = (id) => {
    setCalculators(calculators.filter((calc) => calc.id !== id));
  };

   // Функция выхода из административного интерфейса
   const handleLogout = () => {
    // Здесь можно добавить логику для очистки токена или состояния пользователя
    // Например, если вы используете контекст или Redux, сбросьте состояние пользователя
    // localStorage.removeItem('token'); // Если вы храните токен в localStorage
    navigate('/'); // Перенаправляем на страницу входа
  };

  return (
    <div className=" container m-auto flex-1 flex flex-col items-center p-4">
      <h2 className="text-3xl text-center font-bold py-8 text-dark-blue">Административный интерфейс управления калькуляторами</h2>

      {/* Форма добавления нового калькулятора */}
      <div className=" text-center text-dark-blue bg-gray-100  w-full py-12  ">
        <h3 className="text-2xl font-medium mb-5 underline">Добавить калькулятор</h3>
        <Input
          type="text"
          placeholder="Название банковского продукта"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
          className="border p-2 mr-2 rounded  "
        />
        <Input
          type="number"
          placeholder="Процентная ставка"
          value={newInterestRate}
          onChange={(e) => setNewInterestRate(e.target.value)}
          className="border p-2 mr-2 rounded"
        />
        <Button onClick={handleAdd} className=" bg-dark-blue text-white hover:text-orange " name='Добавить' />
      </div>

      {/* Список калькуляторов */}
      <div className=" bg-gray-200 w-full py-7  mb-10">
        <h3 className="text-2xl  text-center font-medium mb-2  text-dark-blue underline text">Список калькуляторов</h3>
        {calculators.length === 0 ? (
          <p className='text-center text-lg text-orange font-medium'>Нет добавленных калькуляторов</p>
        ) : (
          <ul>
            {calculators.map((calc) => (
              <li key={calc.id} className=" text-xl text-dark-blue border-b py-3 px-3 flex justify-center flex-wrap">
                {editingId === calc.id ? (
                  // Режим редактирования
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      value={editedProductName}
                      onChange={(e) => setEditedProductName(e.target.value)}
                      className="border p-1 rounded"
                    />
                    <Input
                      type="number"
                      value={editedInterestRate}
                      onChange={(e) => setEditedInterestRate(e.target.value)}
                      className="border p-1 rounded"
                    />
                    <Button onClick={handleUpdate} name="Сохранить" className="bg-dark-blue text-white hover:text-orange hover:border hover:border-inherit ">
                      
                    </Button>
                    <Button onClick={() => setEditingId(null)} name="Отмена" className="bg-gray-500 text-white hover:bg-white hover:text-orange hover:border hover:border-inherit ">
                      
                    </Button>
                  </div>
                ) : (
                  // Отобразить данные калькулятора
                  <div className="w-full flex items-center justify-between">
                    <span>
                      <strong>{calc.productName}</strong> — {calc.interestRate}%
                    </span>
                    <div className="flex gap-2">
                      <Button onClick={() => handleEdit(calc)} name='Редактировать' className="bg-dark-blue text-white hover:text-orange ">
                        
                      </Button>
                      <Button onClick={() => handleDelete(calc.id)} name='Удалить' className="bg-white text-red-500  border border-red-500 hover:bg-red-500 hover:text-white  ">
                        
                      </Button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Button onClick={handleLogout} className="bg-red-400 text-white  hover:bg-white hover:text-red-400 hover:border hover:border-red-500 " name="Выйти из админпанели" />
    </div>
  );
};

export default AdminInterface;