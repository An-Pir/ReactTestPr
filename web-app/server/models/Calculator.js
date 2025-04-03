const mongoose = require('mongoose');

const calculatorSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  interestRate: { type: Number, required: true }
});

module.exports = mongoose.model('Calculator', calculatorSchema);