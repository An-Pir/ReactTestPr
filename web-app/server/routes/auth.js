const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Импортируем jsonwebtoken для работы с JWT
const User = require('../models/User');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'Anatan$0304';

// Middleware для проверки валидности токена
const verifyToken = (req, res, next) => {
  // Извлекаем токен из заголовка Authorization
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Нет токена, авторизуйтесь' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Сохраняем полученные данные токена в req.user для дальнейшего использования
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Ошибка валидации токена:', error);
    return res.status(401).json({ message: 'Невалидный токен' });
  }
};

// Middleware для проверки прав администратора
const adminAuth = (req, res, next) => {
  // Предполагается, что req.user уже установлен в verifyToken
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Нет доступа. Требуются права администратора' });
  }
  next();
};

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

    // Создание нового пользователя. По умолчанию назначаем роль 'user'.
    // Если необходимо, администратор может быть назначен вручную в базе данных.
    const newUser = new User({
      login,
      email,
      password: hashedPassword,
      role: 'user'
    });

    // Сохранение пользователя в базе данных MongoDB
    await newUser.save();

    // Генерация токена сразу после регистрации
    const payload = { userId: newUser._id, role: newUser.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      message: 'Пользователь успешно зарегистрирован',
      user: { login: newUser.login, email: newUser.email },
      token, // возвращаем токен при регистрации
    });
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    res.status(500).json({ message: 'Ошибка сервера при регистрации пользователя' });
  }
});

// Роут для аутентификации пользователя с использованием JWT
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

    // Формирование полезной нагрузки для JWT
    const payload = {
      userId: user._id,
      role: user.role || 'user',
    };

    // Генерация JWT с временем жизни 1 час
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    // Возвращение токена
    res.json({ token, role: user.role || 'user' });
  } catch (error) {
    console.error('Ошибка аутентификации:', error);
    res.status(500).json({ message: 'Ошибка сервера при аутентификации пользователя' });
  }
});

// Пример защищенного маршрута, доступного только при наличии валидного токена
router.get('/profile', verifyToken, (req, res) => {
  res.json({
    message: 'Доступ к профилю разрешен',
    user: req.user,
  });
});

// Защищенный маршрут админпанели: доступ разрешен только пользователям с ролью admin
router.get('/admin', verifyToken, adminAuth, (req, res) => {
  res.json({
    message: 'Добро пожаловать в админпанель!',
    user: req.user,
  });
});

module.exports = router;