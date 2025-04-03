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

// Пример других маршрутов:
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

module.exports = router;