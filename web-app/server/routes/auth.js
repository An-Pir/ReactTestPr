const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Роут для регистрации пользователя
router.post('/register', async (req, res) => {
  const { login, email, password } = req.body;

  // Проверка на обязательные поля
  if (!login || !email || !password) {
    return res.status(400).json({ message: 'Все поля должны быть заполнены' });
  }

  try {
    // Проверка на существование пользователя с таким же login или email
    const existingUser = await User.findOne({ $or: [{ login }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь с таким логином или email уже существует' });
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание нового пользователя
    const newUser = new User({
      login,
      email,
      password: hashedPassword,
    });

    // Сохранение пользователя в базе данных MongoDB
    await newUser.save();

    res.status(201).json({ message: 'Пользователь успешно зарегистрирован', user: { login: newUser.login, email: newUser.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера при регистрации пользователя' });
  }
});

// Роут для аутентификации пользователя 
router.post('/login', async (req, res) => {
  const { login, password } = req.body;

  try {
    // Поиск пользователя по логину
    const user = await User.findOne({ login });
    if (!user) {
      return res.status(401).json({ message: 'Неверные учетные данные' });
    }

    // Сравнение введенного пароля с хэшированным паролем
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Неверные учетные данные' });
    }

    // Если аутентификация успешна, возвращаем роль пользователя
    res.json({ role: user.role || 'user' }); // Вернем роль пользователя
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера при аутентификации пользователя' });
  }
});

module.exports = router;