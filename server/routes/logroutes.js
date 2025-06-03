const express = require("express")
const router = express.Router()
const Log = require("../models/Log")
const { appendToSheets } = require("../utils/googleSheets")

router.post('/checkin', async (req, res) => {
  const {name} = req.body
  const now = new Date();

  const date = now.toISOString().split('T')[0]
  const timestamp = now.toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: "America/Mexico_City"
  })
  const log = new Log({name, action: "entrada", date, timestamp})

  try {
    await log.save()
    await appendToSheets(log)
    res.send({success: true})
  }
  catch(err) {
    res.status(500).send({error: 'Failed to save log or sync'})
  }

})

router.post('/checkout', async (req, res) => {
  const {name} = req.body
  const now = new Date();

  const date = now.toISOString().split('T')[0]
  const timestamp = now.toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: "America/Mexico_City"
  })

  const log = new Log({name, action: "salida", date, timestamp})
  await log.save()
  res.send({success: true})

  try {
    await log.save()
    await appendToSheets(log)
    res.send({success: true})
  }
  catch(err) {
    res.status(500).send({error: 'Failed to save log or sync'})
  }
})
module.exports = router