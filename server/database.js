const mongoose = require("mongoose")

const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI)

module.exports = mongoose