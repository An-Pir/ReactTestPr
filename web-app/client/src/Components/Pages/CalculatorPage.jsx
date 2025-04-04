import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Calculator = () => {
  const [bankProducts, setBankProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [creditAmount, setCreditAmount] = useState('');
  const [creditTerm, setCreditTerm] = useState('');
  const [cost, setCost] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [result, setResult] = useState(null);

  // Получение списка банковских продуктов с сервера
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/calculators')
      .then((response) => setBankProducts(response.data))
      .catch((err) => console.error(err));
  }, []);

  const handleCalculate = () => {
    // Находим выбранный продукт, чтобы определить, какие поля передавать
    const selectedBankProduct = bankProducts.find(
      (product) => product._id === selectedProduct
    );

    // Формируем данные запроса; creditTerm преобразуем в годы (делим на 12)
    const requestData = {
      calculatorId: selectedProduct,
      creditTerm: Number(creditTerm) / 12,
    };

    if (selectedBankProduct) {
      const productNameLower = selectedBankProduct.productName.toLowerCase();

      if (productNameLower === 'ипотечный' || productNameLower === 'автокредит') {
        requestData.cost = Number(cost);
        requestData.downPayment = Number(downPayment);
      } else if (productNameLower === 'потребительский кредит') {
        requestData.creditAmount = Number(creditAmount);
      } else {
        // Для неизвестного типа продукта используем creditAmount как запасной вариант
        requestData.creditAmount = Number(creditAmount);
      }
    } else {
      // Если не выбран продукт, передаем creditAmount
      requestData.creditAmount = Number(creditAmount);
    }

    axios
      .post('http://localhost:5000/api/calculators/calculate', requestData)
      .then((response) => setResult(response.data))
      .catch((err) => console.error(err));
  };

  // Определяем выбранный продукт для условной отрисовки дополнительных полей
  const selectedBankProduct = bankProducts.find(
    (product) => product._id === selectedProduct
  );
  const productNameLower = selectedBankProduct
    ? selectedBankProduct.productName.toLowerCase()
    : '';

  return (
    <div>
      <h2>Финансовый калькулятор</h2>
      <div>
        <label>Выберите продукт:</label>
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          <option value="">-- Выберите --</option>
          {bankProducts.map((product) => (
            <option key={product._id} value={product._id}>
              {product.productName} ({product.interestRate || product.annualRate}%)
            </option>
          ))}
        </select>
      </div>
      {(productNameLower === 'ипотечный' || productNameLower === 'автокредит') && (
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
      {(productNameLower === 'потребительский кредит' || !selectedBankProduct) && (
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
      <button onClick={handleCalculate}>Рассчитать</button>

      {result && (
        <div>
          <h3>Результаты расчёта</h3>
          <p>Продукт: {result.productName}</p>
          <p>Годовая ставка: {result.annualRate}%</p>
          <p>Сумма кредита: {result.loanAmount}</p>
          <p>Ежемесячный платёж: {result.monthlyPayment}</p>
          <p>Необходимый доход: {result.requiredIncome}</p>
        </div>
      )}
    </div>
  );
};

export default Calculator;