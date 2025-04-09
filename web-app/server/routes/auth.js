const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'Anatan$0304';

// Middleware для проверки валидности токена
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Нет токена, авторизуйтесь' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Сохраняем данные токена для дальнейшего использования
    next();
  } catch (error) {
    console.error('Ошибка валидации токена:', error);
    return res.status(401).json({ message: 'Невалидный токен' });
  }
};

// Middleware для проверки прав администратора
const adminAuth = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Нет доступа. Требуются права администратора' });
  }
  next();
};

// Роут для регистрации пользователя
router.post('/register', async (req, res) => {
  const { login, email, password } = req.body;

  // Проверка обязательных полей
  if (!login || !email || !password) {
    return res.status(400).json({ message: 'Все поля должны быть заполнены' });
  }

  try {
    // Проверяем, существует ли пользователь с таким же логином или email
    const existingUser = await User.findOne({ $or: [{ login }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь с таким логином или email уже существует' });
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание нового пользователя (роль пользователя по умолчанию — 'user')
    const newUser = new User({
      login,
      email,
      password: hashedPassword,
      role: 'user'
    });

    // Сохраняем пользователя в базе данных
    await newUser.save();

    // Генерация JWT (срок жизни 1 час)
    const payload = { userId: newUser._id, role: newUser.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    return res.status(201).json({
      message: 'Пользователь успешно зарегистрирован',
      user: { login: newUser.login, email: newUser.email },
      token // возвращаем токен сразу при регистрации
    });
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    return res.status(500).json({ message: 'Ошибка сервера при регистрации пользователя' });
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

    // Сравнение паролей
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Неверные учетные данные' });
    }

    // Формирование полезной нагрузки для JWT
    const payload = {
      userId: user._id,
      role: user.role || 'user'
    };

    // Генерация JWT (1 час)
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    return res.json({ token, role: user.role || 'user' });
  } catch (error) {
    console.error('Ошибка аутентификации:', error);
    return res.status(500).json({ message: 'Ошибка сервера при аутентификации пользователя' });
  }
});

// Защищённый роут для доступа к профилю
router.get('/profile', verifyToken, (req, res) => {
  return res.json({
    message: 'Доступ к профилю разрешен',
    user: req.user
  });
});

// Защищённый роут для админпанели (требуются права администратора)
router.get('/admin', verifyToken, adminAuth, (req, res) => {
  return res.json({
    message: 'Добро пожаловать в админпанель!',
    user: req.user
  });
});

module.exports = router;