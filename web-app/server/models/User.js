const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // Возможные роли
    default: 'user', // Значение по умолчанию
  },
}, { timestamps: true }); // добавляет поля createdAt и updatedAt

module.exports = mongoose.model('User', UserSchema);