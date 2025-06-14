const mongoose = require("../database");

const logSchema = new mongoose.Schema({
  name: {type: String, required: true, trim: true},
  action: {type: String, enum: ['entrada', 'salida'], required: true},
  timestamp: {type: String, required: true},
  date: {type: String, required: true}
})

module.exports = mongoose.model('Log', logSchema)