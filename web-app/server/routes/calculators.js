const express = require('express');
const router = express.Router();
const Calculator = require('../models/Calculator'); // Модель калькулятора

// Создание нового калькулятора
router.post('/', async (req, res) => {
  try {
    const newCalculator = new Calculator(req.body);
    const savedCalculator = await newCalculator.save();
    return res.status(201).json(savedCalculator);
  } catch (error) {
    console.error('Ошибка при добавлении калькулятора:', error);
    return res.status(400).json({
      message: 'Ошибка добавления калькулятора',
      error: error.message,
    });
  }
});

// Получение списка калькуляторов
router.get('/', async (req, res) => {
  try {
    const calculators = await Calculator.find();
    return res.status(200).json(calculators);
  } catch (error) {
    console.error('Ошибка при получении калькуляторов:', error);
    return res.status(400).json({
      message: 'Ошибка получения калькуляторов',
      error: error.message,
    });
  }
});

// Обновление калькулятора по ID
router.put('/:id', async (req, res) => {
  try {
    const updatedCalculator = await Calculator.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(200).json(updatedCalculator);
  } catch (error) {
    console.error('Ошибка при обновлении калькулятора:', error);
    return res.status(400).json({
      message: 'Ошибка обновления калькулятора',
      error: error.message,
    });
  }
});

// Удаление калькулятора по ID
router.delete('/:id', async (req, res) => {
  try {
    await Calculator.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: 'Калькулятор удалён' });
  } catch (error) {
    console.error('Ошибка при удалении калькулятора:', error);
    return res.status(400).json({
      message: 'Ошибка удаления калькулятора',
      error: error.message,
    });
  }
});

// Маршрут для расчёта кредита по выбранному банковскому продукту
router.post('/calculate', async (req, res) => {
  try {
    /* Ожидаемые параметры:
         calculatorId - идентификатор банковского продукта
         creditTerm - срок кредита в годах

         Для ипотечных и автокредитов:
           cost - стоимость объекта (или автомобиля)
           downPayment - первоначальный взнос

         Для потребительского кредита:
           creditAmount - сумма кредита
    */
    const { calculatorId, cost, downPayment, creditAmount, creditTerm } =
      req.body;

    // Проверка наличия обязательных полей
    if (
      !calculatorId ||
      !creditTerm ||
      ((!cost || !downPayment) && !creditAmount)
    ) {
      return res
        .status(400)
        .json({ message: 'Недостаточно данных для расчёта' });
    }

    // Поиск выбранного банковского калькулятора
    const calculator = await Calculator.findById(calculatorId);
    if (!calculator) {
      return res.status(404).json({ message: 'Банковский продукт не найден' });
    }

    // Получение годовой процентной ставки из БД
    const annualRate = calculator.interestRate;
    let loanAmount;
    const calculatorNameLower = calculator.calculatorName.toLowerCase();

    // Если продукт - "ипотека" или "автокредит"
    if (
      calculatorNameLower === 'ипотека' ||
      calculatorNameLower === 'автокредит'
    ) {
      if (cost == null || downPayment == null) {
        return res.status(400).json({
          message:
            'Для расчёта ипотеки или автокредита требуется указать стоимость и первоначальный взнос',
        });
      }
      loanAmount = Number(cost) - Number(downPayment);
    }
    // Если продукт - "потребительский кредит"
    else if (calculatorNameLower === 'потребительский кредит') {
      loanAmount = Number(creditAmount);
    }
    // Если название продукта не соответствует известным типам,
    // пытаемся использовать переданный creditAmount либо разницу между cost и downPayment.
    else {
      loanAmount = Number(creditAmount) || Number(cost) - Number(downPayment);
    }

    // Расчёт ежемесячного процента
    const monthlyRate = annualRate / 12 / 100;
    // Количество месяцев (срок кредита в годах преобразуем в месяцы)
    const periodMonths = Number(creditTerm) * 12;
    // Расчёт суммарного умножителя для аннуитетного платежа
    const overallRate = Math.pow(1 + monthlyRate, periodMonths);
    // Формула расчёта ежемесячного платежа:
    // M = (loanAmount * monthlyRate * overallRate) / (overallRate - 1)
    const monthlyPayment =
      (loanAmount * monthlyRate * overallRate) / (overallRate - 1);
    // Расчёт рекомендуемого дохода (предполагается, что платеж не должен превышать 40% от дохода)
    const requiredIncome = monthlyPayment * 2.5;

    return res.status(200).json({
      calculatorName: calculator.calculatorName,
      annualRate,
      loanAmount: loanAmount.toFixed(2),
      creditTerm,
      monthlyPayment: monthlyPayment.toFixed(2),
      requiredIncome: requiredIncome.toFixed(2),
    });
  } catch (error) {
    console.error('Ошибка при расчёте кредита:', error);
    return res.status(500).json({
      message: 'Ошибка сервера при расчёте',
      error: error.message,
    });
  }
});

module.exports = router;
