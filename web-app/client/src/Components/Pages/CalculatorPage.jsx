import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageTitle from '../Common/PageTitle';

const CalculatorPage = () => {
  const [bankCalculators, setBankCalculators] = useState([]);
  const [selectedCalculator, setSelectedCalculator] = useState('');
  const [creditAmount, setCreditAmount] = useState('');
  const [creditTerm, setCreditTerm] = useState('');
  const [cost, setCost] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [result, setResult] = useState(null);

  // Получение списка банковских продуктов с сервера
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/calculators')
      .then((response) => setBankCalculators(response.data))
      .catch((err) => console.error(err));
  }, []);

  const handleCalculate = () => {
    const selectedBankCalculator = bankCalculators.find(
      (calculator) => calculator._id === selectedCalculator
    );

    // Формирование данных запроса: перевод срока кредита из месяцев в годы
    const requestData = {
      calculatorId: selectedCalculator,
      creditTerm: Number(creditTerm) / 12,
    };

    if (selectedBankCalculator) {
      const calculatortNameLower = selectedBankCalculator.calculatorName.toLowerCase();

      if (calculatorNameLower === 'ипотечный' || calculatorNameLower === 'автокредит') {
        requestData.cost = Number(cost);
        requestData.downPayment = Number(downPayment);
      } else if (calculatorNameLower === 'потребительский') {
        requestData.creditAmount = Number(creditAmount);
      } else {
        requestData.creditAmount = Number(creditAmount);
      }
    } else {
      requestData.creditAmount = Number(creditAmount);
    }

    axios
      .post('http://localhost:5000/api/calculators/calculate', requestData)
      .then((response) => setResult(response.data))
      .catch((err) => console.error(err));
  };

  // Определяем выбранный продукт для условной отрисовки дополнительных полей
  const selectedBankCalculator = bankCalculators.find(
    (calculator) => calculator._id === selectedCalculator
  );
  const calculatorNameLower = selectedBankCalculator
    ? selectedBankCalculator.calculatorName.toLowerCase()
    : '';

  // Проверка условий для активации кнопки (оставляем для наглядности, если понадобится)
  const isButtonDisabled = () => {
    const isCalculatorSelected = selectedCalculator !== '';
    const isFormFilled =
      (calculatorNameLower === 'ипотечный' || calculatorNameLower === 'автокредит') 
        ? cost && downPayment && creditTerm
        : (calculatorNameLower === 'потребительский кредит' || !selectedBankCalculator) 
          ? creditAmount && creditTerm
          : creditTerm; // Для прочих случаев требуется заполнить только срок кредита

    return !isCalculatorSelected || !isFormFilled;
  };

  return (
    <div className=' container m-auto  h-screen'>
      <PageTitle name='Финансовый калькулятор' className='mt-10'/>
      <div className='text-center'>

        <label className='text-dark-blue  text-[18px] sm:text-2xl lg:text-3xl font-medium pr-4'>Выберите калькулятор:</label>
        <select
        className=' text-center text-[18px] sm:text-2xl lg:text-3xl text-orange focus:outline-none'
          value={selectedCalculator}
          onChange={(e) => {
            setSelectedCalculator(e.target.value);
            // Сбросим поля при изменении выбора продукта:
            setCreditAmount('');
            setCreditTerm('');
            setCost('');
            setDownPayment('');
            setResult(null);
          }}
        >
          <option className=' text-dark-blue' value="">-- Все калькуляторы --</option>
          {bankCalculators.map((calculator) => (
            <option key={calculator._id} value={calculator._id}>
              {calculator.calculatorName} ({calculator.interestRate || calculator.annualRate}%)
            </option>
          ))}
        </select>
      </div>

      {/* Если продукт не выбран, скрываем поля ввода и кнопку */}
      {selectedCalculator && (
        <>
          {(calculatorNameLower === 'ипотечный' || calculatorNameLower === 'автокредит') && (
            <>
              <div>
                <label>Стоимость объекта:</label>
                <input
                  type="number"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                />
              </div>
              <div>
                <label>Первоначальный взнос:</label>
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                />
              </div>
            </>
          )}
          {(calculatorNameLower === 'потребительский' || !selectedBankCalculator) && (
            <div>
              <label>Сумма кредита:</label>
              <input
                type="number"
                value={creditAmount}
                onChange={(e) => setCreditAmount(e.target.value)}
              />
            </div>
          )}
          <div>
            <label>Срок кредита (в месяцах):</label>
            <input
              type="number"
              value={creditTerm}
              onChange={(e) => setCreditTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={handleCalculate} 
            disabled={isButtonDisabled()}
          >
            Рассчитать
          </button>
        </>
      )}

      {result && (
        <div>
          <h3>Результаты расчёта</h3>
          <p>Продукт: {result.calculatorName}</p>
          <p>Годовая ставка: {result.annualRate}%</p>
          <p>Сумма кредита: {result.loanAmount}</p>
          <p>Ежемесячный платёж: {result.monthlyPayment}</p>
          <p>Необходимый доход: {result.requiredIncome}</p>
        </div>
      )}
    </div>
  );
};

export default CalculatorPage;