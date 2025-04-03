const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db'); // Функция подключения MongoDB
const authRoutes = require('./routes/auth');
const calculatorRoutes = require('./routes/calculators'); // Импортируем маршруты калькуляторов

dotenv.config();
const app = express();

// Подключение к MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Маршруты
app.use('/api/auth', authRoutes);
app.use('/api/calculators', calculatorRoutes);

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});