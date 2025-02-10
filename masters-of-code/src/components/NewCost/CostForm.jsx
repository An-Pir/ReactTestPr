import './CostForm.css';
import { useState } from 'react';

const CostForm = () => {

    const [inputName, setInputName] = useState('');
    const [inputAmount, setInputAmount] = useState('');
    const [inputDate, setInputDame] = useState('');

    const nameChangeHandler = (event) => {
        setInputName(event.target.value)
    }

    const amountChangeHandler = (event) => {
        setInputAmount(event.target.value)
    }

    const dateChangeHandler = (event) => {
        setInputDame(event.target.value)
    }

    const submitHandler = (event) => {
      event.preventDefault();

      if(!inputName || !inputAmount || !inputDate){
        alert("Заполните все поля формы");
        return;
      }

      const costData = {
        name: inputName,
        amount: inputAmount,
        date: new Date (inputDate),
      }

      console.log(costData);
    }
  return (
    <form onSubmit={submitHandler}>
      <div className="new-cost__controls">
        <div className="new-cost__control">
          <label>Название</label>
          <input type="text" onChange={nameChangeHandler}/>
        </div>
        <div className="new-cost__control">
          <label>Сумма</label>
          <input type="number" min="0.01" step="0.01" onChange={amountChangeHandler}/>
        </div>
        <div className="new-cost__control">
          <label>Дата</label>
          <input type="date" min="2019-01-01" max="2025-12-31" onChange={dateChangeHandler}/>
        </div>
        <div className="new-cost__actions">
            <button type="submit">Добавить расход</button>
            <button>Отмена</button>
        </div>
      </div>
    </form>
  );
};

export default CostForm;
