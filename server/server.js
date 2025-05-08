const express = require("express")
const cors = require("cors")
const { createWeeklySheet } = require("./controllers/googleSheets")
const cron = require("node-cron")
const logroutes = require("./routes/logroutes")

const PORT = process.env.PORT | 3001
const app = express()

app.use(cors())
app.use(express.json());
app.use('/api', logroutes);

cron.schedule('0 7 * * 1', () => {
  createWeeklySheet(["Adolfo", "Alfredo", "Andreina", "Carlos", "Johan", "Mariano", "Omar", "Vicente"])
})

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
