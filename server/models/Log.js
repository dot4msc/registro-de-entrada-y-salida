const mongoose = require("../database");

const logSchema = new mongoose.Schema({
  name: {type: String, required: true, trim: true},
  action: {type: String, enum: ['entrada', 'salida'], required: true},
  timestamp: {type: String, default: Intl.DateTimeFormat('es-MX', {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Mexico_City"
  }).format(Date.now())},
  date: {type: String, required: true}
})

module.exports = mongoose.model('Log', logSchema)