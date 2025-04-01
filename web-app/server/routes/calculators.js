const express = require('express');
const Calculator = require('../models/Calculator');
const router = express.Router();

// Получение всех калькуляторов
router.get('/', async (req, res) => {
  const calculators = await Calculator.find();
  res.json(calculators);
});

// Добавление нового калькулятора (требуется аутентификация)
router.post('/', async (req, res) => {
  const newCalculator = new Calculator(req.body);
  await newCalculator.save();
  res.status(201).send('Калькулятор добавлен');
});

module.exports = router;