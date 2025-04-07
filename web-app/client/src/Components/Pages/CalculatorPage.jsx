import React, { useState, useEffect } from 'react';
import PageTitle from '../Common/PageTitle';
import Button from '../Common/Button';
import NumberInput from '../Common/NumberInput';
import { fetchCalculators, calculateResult } from '../../api/calculatorsApi';

const CalculatorPage = () => {
  const [bankCalculators, setBankCalculators] = useState([]);
  const [selectedCalculator, setSelectedCalculator] = useState('');
  const [creditAmount, setCreditAmount] = useState('');
  const [creditTerm, setCreditTerm] = useState('');
  const [cost, setCost] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({}); // Хранение ошибок валидации

  // Получение списка банковских продуктов с сервера
  useEffect(() => {
    const loadCalculators = async () => {
      try {
        const data = await fetchCalculators();
        setBankCalculators(data);
      } catch (err) {
        console.error('Ошибка при получении калькуляторов:', err);
      }
    };

    loadCalculators();
  }, []);

  // Валидация для введенных данных, чтобы избежать отправки некорректных значений на сервер.
  const validateInputs = () => {
    const newErrors = {};
    const calculatorNameLower = bankCalculators
      .find((calculator) => calculator._id === selectedCalculator)
      ?.calculatorName.toLowerCase();

    if (
      calculatorNameLower === 'ипотечный' ||
      calculatorNameLower === 'автокредит'
    ) {
      if (!cost || cost <= 0) newErrors.cost = 'Введите стоимость объекта.';
      if (!downPayment || downPayment < 0)
        newErrors.downPayment = 'Введите сумму первоначального взноса.';
      if (!creditTerm || creditTerm <= 0)
        newErrors.creditTerm = 'Введите срок займа.';
    } else {
      // Для всех остальных (в т.ч. «потребительский» и новых калькуляторов)
      if (!creditAmount || creditAmount <= 0)
        newErrors.creditAmount = 'Введите сумму займа.';
      if (!creditTerm || creditTerm <= 0)
        newErrors.creditTerm = 'Введите срок займа.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Возвращаем true, если ошибок нет
  };

  const handleCalculate = async () => {
    if (!validateInputs()) return;

    const currentCalculator = bankCalculators.find(
      (calc) => calc._id === selectedCalculator
    );
    const calculatorNameLower = currentCalculator?.calculatorName.toLowerCase() || '';

    const requestData = {
      calculatorId: selectedCalculator,
      creditTerm: Number(creditTerm) / 12,
    };

    if (calculatorNameLower === 'ипотечный' || calculatorNameLower === 'автокредит') {
      requestData.cost = Number(cost);
      requestData.downPayment = Number(downPayment);
    } else {
      requestData.creditAmount = Number(creditAmount);
    }

    try {
      const calcResult = await calculateResult(requestData);
      setResult(calcResult);
    } catch (err) {
      console.error('Ошибка при расчете:', err);
    }
  };

  // Обработчик сброса всех данных
  const handleReset = () => {
    setSelectedCalculator('');
    setCreditAmount('');
    setCreditTerm('');
    setCost('');
    setDownPayment('');
    setResult(null);
    setErrors({});
  };

  const selectedBankCalculator = bankCalculators.find(
    (calculator) => calculator._id === selectedCalculator
  );
  const calculatorNameLower = selectedBankCalculator
    ? selectedBankCalculator.calculatorName.toLowerCase()
    : '';

 

  return (
    <div className='container m-auto h-screen flex flex-col'>
      <PageTitle name='Финансовый калькулятор' className='my-10 ' />
      <div className='text-center mb-5 '>
        <label className='text-dark-blue text-[18px] sm:text-2xl lg:text-3xl font-medium pr-4'>
          Выберите калькулятор:
        </label>
        <select
          className='text-center text-lg sm:text-xl lg:text-2xl text-orange font-medium focus:outline-none'
          value={selectedCalculator}
          onChange={(e) => {
            setSelectedCalculator(e.target.value);
            setCreditAmount('');
            setCreditTerm('');
            setCost('');
            setDownPayment('');
            setResult(null);
            setErrors({}); // Сброс ошибок при выборе нового калькулятора
          }}
        >
          <option className='text-dark-blue' value=''>
            --Выбирете калькулятор --
          </option>
          {bankCalculators.map((calculator) => (
            <option
              key={calculator._id}
              value={calculator._id}
              className='text-dark-blue text-[12px] lg:text-lg '
            >
              {calculator.calculatorName} (
              {calculator.interestRate || calculator.annualRate}%)
            </option>
          ))}
        </select>
      </div>

      {selectedCalculator && (
        <div className='flex flex-col items-center gap-5'>
          {(calculatorNameLower === 'ипотечный' ||
            calculatorNameLower === 'автокредит') && (
            <div className='flex flex-col gap-5'>
              <div className='relative'>
                <label className='flex flex-col mb-1 text-lg '>
                  Стоимость объекта:
                  <NumberInput
                    placeholder='Укажите цену'
                    value={cost}
                    onChange={(value) => setCost(value)}
                  />
                </label>
                <span className='absolute text-2xl right-3 top-13 transform -translate-y-1/2 text-orange'>
                  ₽
                </span>
                {errors.cost && <p className='text-orange'>{errors.cost}</p>}
              </div>
              <div className='relative'>
                <label className='flex flex-col mb-1 text-lg '>
                  Первоначальный взнос:
                  <NumberInput
                    placeholder='Укажите сумму'
                    value={downPayment}
                    onChange={(value) => setDownPayment(value)}
                  />
                  <span className='absolute text-2xl right-3 top-13 transform -translate-y-1/2 text-orange'>
                    ₽
                  </span>
                </label>
                {errors.downPayment && (
                  <p className='text-orange'>{errors.downPayment}</p>
                )}
              </div>
            </div>
          )}

          {/* Если калькулятор не "ипотечный" и не "автокредит" – отображаем поле для суммы кредита */}
          {calculatorNameLower !== 'ипотечный' &&
            calculatorNameLower !== 'автокредит' && (
              <div className='relative'>
                <label className='flex flex-col mb-1 text-lg  '>
                  Сумма кредита:
                  <NumberInput
                    placeholder='Укажите сумму'
                    value={creditAmount}
                    onChange={(value) => setCreditAmount(value)}
                  />
                </label>
                <span className='absolute text-2xl right-3 top-13 transform -translate-y-1/2 text-orange'>
                  ₽
                </span>
                {errors.creditAmount && (
                  <p className='text-orange'>{errors.creditAmount}</p>
                )}
              </div>
            )}

          <div>
            <label className='flex flex-col mb-1 text-lg'>
              Срок кредита (в месяцах):
              <NumberInput
                placeholder='Укажите количество месяцев'
                value={creditTerm}
                onChange={(value) => setCreditTerm(value)}
              />
            </label>
            {errors.creditTerm && (
              <p className='text-orange'>{errors.creditTerm}</p>
            )}
          </div>
          <div className=' flex  gap-4 '>
            <Button
              onClick={handleCalculate}
              className='bg-dark-blue text-white hover:text-orange px-5'
              name='Рассчитать'
            ></Button>

            <Button
              onClick={handleReset}
              className='bg-dark-blue text-white hover:text-orange px-5'
              name='Сбросить'
            />
          </div>
        </div>
      )}

      {result && (
        <div className='flex flex-col gap-3 bg-gray-300 py-10 mt-5 items-center'>
          <h2 className='text-dark-blue text-xl md:text-3xl lg:text-4xl underline mb-4'>
            Результаты расчёта
          </h2>
          <div className='flex flex-col gap-2 text-lg md:text-xl lg:text-2xl'>
            <p className='text-dark-blue'>
              Калькулятор:{' '}
              <span className='text-orange pl-4'>{result.calculatorName}</span>
            </p>
            <p className='text-dark-blue'>
              Годовая ставка:{' '}
              <span className='text-orange pl-4'>{result.annualRate}%</span>
            </p>
            <p className='text-dark-blue'>
              Сумма кредита:{' '}
              <span className='text-orange pl-4'>{result.loanAmount}</span>
            </p>
            <p className='text-dark-blue'>
              Ежемесячный платёж:{' '}
              <span className='text-orange pl-4'>{result.monthlyPayment}</span>
            </p>
            <p className='text-dark-blue'>
              Необходимый доход:{' '}
              <span className='text-orange pl-4'>{result.requiredIncome}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculatorPage;
