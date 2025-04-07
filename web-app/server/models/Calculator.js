const mongoose = require('mongoose');

const calculatorSchema = new mongoose.Schema({
  calculatorName: { type: String, required: true },
  interestRate: { type: Number, required: true }
});

module.exports = mongoose.model('Calculator', calculatorSchema);