import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageTitle from '../Common/PageTitle';
import Input from '../Common/Input';
import Button from '../Common/Button';
import NumberInput from '../Common/NumberInput';

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
    const fetchCalculators = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/calculators'
        );
        setBankCalculators(response.data);
      } catch (err) {
        console.error('Ошибка при получении калькуляторов:', err);
      }
    };

    fetchCalculators();
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
      if (!cost || cost <= 0)
        newErrors.cost = 'Стоимость объекта должна быть положительным числом.';
      if (!downPayment || downPayment < 0)
        newErrors.downPayment =
          'Первоначальный взнос не может быть отрицательным.';
      if (!creditTerm || creditTerm <= 0)
        newErrors.creditTerm = 'Срок кредита должен быть положительным числом.';
    } else if (calculatorNameLower === 'потребительский кредит') {
      if (!creditAmount || creditAmount <= 0)
        newErrors.creditAmount =
          'Сумма кредита должна быть положительным числом.';
      if (!creditTerm || creditTerm <= 0)
        newErrors.creditTerm = 'Срок кредита должен быть положительным числом.';
    } else {
      if (!creditAmount || creditAmount <= 0)
        newErrors.creditAmount =
          'Сумма кредита должна быть положительным числом.';
      if (!creditTerm || creditTerm <= 0)
        newErrors.creditTerm = 'Срок кредита должен быть положительным числом.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Возвращаем true, если ошибок нет
  };

  const handleCalculate = () => {
    if (!validateInputs()) return; // Проверяем валидацию перед расчетом

    const selectedBankCalculator = bankCalculators.find(
      (calculator) => calculator._id === selectedCalculator
    );

    const requestData = {
      calculatorId: selectedCalculator,
      creditTerm: Number(creditTerm) / 12,
    };

    if (selectedBankCalculator) {
      const calculatorNameLower =
        selectedBankCalculator.calculatorName.toLowerCase();

      if (
        calculatorNameLower === 'ипотечный' ||
        calculatorNameLower === 'автокредит'
      ) {
        requestData.cost = Number(cost);
        requestData.downPayment = Number(downPayment);
      } else {
        requestData.creditAmount = Number(creditAmount);
      }
    } else {
      requestData.creditAmount = Number(creditAmount);
    }

    axios
      .post('http://localhost:5000/api/calculators/calculate', requestData)
      .then((response) => setResult(response.data))
      .catch((err) => console.error('Ошибка при расчете:', err));
  };

  const selectedBankCalculator = bankCalculators.find(
    (calculator) => calculator._id === selectedCalculator
  );
  const calculatorNameLower = selectedBankCalculator
    ? selectedBankCalculator.calculatorName.toLowerCase()
    : '';

  const isButtonDisabled = () => {
    const isCalculatorSelected = selectedCalculator !== '';
    const isFormFilled =
      calculatorNameLower === 'ипотечный' ||
      calculatorNameLower === 'автокредит'
        ? cost > 0 && downPayment >= 0 && creditTerm > 0
        : calculatorNameLower === 'потребительский' || !selectedBankCalculator
        ? creditAmount > 0 && creditTerm > 0
        : creditTerm > 0; // Для прочих случаев требуется заполнить только срок кредита

    return !isCalculatorSelected || !isFormFilled;
  };

  return (
    <div className='container m-auto h-screen flex flex-col'>
      <PageTitle name='Финансовый калькулятор' className='my-10 ' />
      <div className='text-center mb-5 '>
        <label className='text-dark-blue text-[18px] sm:text-2xl lg:text-3xl font-medium pr-4'>
          Выберите калькулятор:
        </label>
        <select
          className='text-center text-[18px] sm:text-2xl lg:text-3xl text-orange focus:outline-none'
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
            -- Все калькуляторы --
          </option>
          {bankCalculators.map((calculator) => (
            <option key={calculator._id} value={calculator._id}>
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
              <div className=''>
                <label className='flex flex-col mb-1 text-lg '>
                  Стоимость объекта:
                  <NumberInput
                    placeholder='Укажите цену'
                    value={cost}
                    onChange={(value) => setCost(value)}
                  />
                </label>

                {errors.cost && <p className='text-orange'>{errors.cost}</p>}
              </div>
              <div>
                <label className='flex flex-col mb-1 text-lg '>
                  Первоначальный взнос:
                  <NumberInput
                    placeholder='Укажите сумму'
                    value={downPayment}
                    onChange={(value) => setDownPayment(value)}
                  />
                </label>

                {errors.downPayment && (
                  <p className='text-red-500'>{errors.downPayment}</p>
                )}
              </div>
            </div>
          )}
          {(calculatorNameLower === 'потребительский' ||
            !selectedBankCalculator) && (
            <div className=''>
              <label className='flex flex-col mb-1 text-lg '>
                Сумма кредита:
                <NumberInputt

                  placeholder='Укажите сумму '
                  value={creditAmount}
                  onChange={(value) => setCreditAmount(value)}
                />
              </label>

              {errors.creditAmount && (
                <p className='text-orange'>{errors.creditAmount}</p>
              )}
            </div>
          )}
          <div>
            <label className='flex flex-col mb-1 text-lg'>
              Срок кредита (в месяцах):
              <Input
                type='number'
                placeholder='Укажите количество месяцев '
                value={creditTerm}
                onChange={(e) => setCreditTerm(e.target.value)}
              />
            </label>

            {errors.creditTerm && (
              <p className='text-red-500'>{errors.creditTerm}</p>
            )}
          </div>
          <Button
            onClick={handleCalculate}
            disabled={isButtonDisabled()}
            className='bg-dark-blue text-white hover:text-orange px-5'
            name='Рассчитать'
          ></Button>
        </div>
      )}

      {result && (
        <div>
          <h2>Результаты расчёта</h2>
          <p>Калькулятор: {result.calculatorName}</p>
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
