// routes/calculators.js
const express = require('express');
const router = express.Router();
const Calculator = require('../models/Calculator'); // ваша модель калькулятора

// Создание нового калькулятора
router.post('/', async (req, res) => {
  try {
    const newCalculator = new Calculator(req.body);
    const savedCalculator = await newCalculator.save();
    res.status(201).json(savedCalculator);
  } catch (error) {
    console.error('Ошибка при добавлении калькулятора:', error);
    res.status(400).json({ message: 'Ошибка добавления калькулятора', error: error.message });
  }
});

// Получение списка калькуляторов
router.get('/', async (req, res) => {
  try {
    const calculators = await Calculator.find();
    res.status(200).json(calculators);
  } catch (error) {
    console.error('Ошибка при получении калькуляторов:', error);
    res.status(400).json({ message: 'Ошибка получения калькуляторов', error: error.message });
  }
});

// Обновление калькулятора
router.put('/:id', async (req, res) => {
  try {
    const updatedCalculator = await Calculator.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedCalculator);
  } catch (error) {
    console.error('Ошибка при обновлении калькулятора:', error);
    res.status(400).json({ message: 'Ошибка обновления калькулятора', error: error.message });
  }
});

// Удаление калькулятора
router.delete('/:id', async (req, res) => {
  try {
    await Calculator.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Калькулятор удалён' });
  } catch (error) {
    console.error('Ошибка при удалении калькулятора:', error);
    res.status(400).json({ message: 'Ошибка удаления калькулятора', error: error.message });
  }
});

// Маршрут для расчёта кредита по выбранному банковскому продукту
router.post('/calculate', async (req, res) => {
  try {
    // Ожидаемые параметры:
    // calculatorId - идентификатор банковского продукта
    // creditTerm - срок кредита в годах
    // Для ипотечных и автокредитов:
    //   cost - стоимость объекта (или автомобиля)
    //   downPayment - первоначальный взнос
    // Для потребительского кредита:
    //   creditAmount - сумма кредита
    const { calculatorId, cost, downPayment, creditAmount, creditTerm } = req.body;

    // Проверка наличия обязательных полей
    if (!calculatorId || !creditTerm || ((!cost || !downPayment) && !creditAmount)) {
      return res.status(400).json({ message: 'Недостаточно данных для расчёта' });
    }

    // Поиск выбранного банковского продукта в базе
    const product = await Calculator.findById(calculatorId);
    if (!product) {
      return res.status(404).json({ message: 'Банковский продукт не найден' });
    }

    // Годовая процентная ставка из БД
    // Должна соответствовать одному из значений:
    // Ипотека - 9.6, Автокредит - 3.5, Потребительский кредит - 14.5
    const annualRate = product.interestRate; 

    let loanAmount;
    const productNameLower = product.productName.toLowerCase();

    // Если продукт - "ипотека" или "автокредит", рассчитываем сумму кредита как разницу между стоимостью и первоначальным взносом.
    if (productNameLower === 'ипотека' || productNameLower === 'автокредит') {
      if (cost == null || downPayment == null) {
        return res.status(400).json({ message: 'Для расчёта ипотеки или автокредита требуется указать стоимость и первоначальный взнос' });
      }
      loanAmount = Number(cost) - Number(downPayment);
    } 
    // Если продукт - "потребительский кредит", сумма кредита передаётся напрямую.
    else if (productNameLower === 'потребительский кредит') {
      loanAmount = Number(creditAmount);
    }
    // Если название продукта не соответствует известным, пытаемся использовать переданный creditAmount,
    // либо, если он не указан, рассчитываем по стоимости и первоначальному взносу.
    else {
      loanAmount = Number(creditAmount) || (Number(cost) - Number(downPayment));
    }

    // Расчёт ежемесячной ставки
    const monthlyRate = annualRate / 12 / 100;
    // Количество месяцев (срок кредита вводится в годах)
    const periodMonths = Number(creditTerm) * 12;
    // Расчёт общей ставки
    const overallRate = Math.pow(1 + monthlyRate, periodMonths);
    // Расчёт ежемесячного платежа по формуле: 
    // M = (loanAmount * monthlyRate * overallRate) / (overallRate - 1)
    const monthlyPayment = loanAmount * monthlyRate * overallRate / (overallRate - 1);
    // Расчёт необходимого дохода
    const requiredIncome = monthlyPayment * 2.5;

    res.status(200).json({
      productName: product.productName,
      annualRate: annualRate,
      loanAmount: loanAmount.toFixed(2),
      creditTerm,
      monthlyPayment: monthlyPayment.toFixed(2),
      requiredIncome: requiredIncome.toFixed(2)
    });
  } catch (error) {
    console.error('Ошибка при расчёте кредита:', error);
    res.status(500).json({ message: 'Ошибка сервера при расчёте', error: error.message });
  }
});

module.exports = router;