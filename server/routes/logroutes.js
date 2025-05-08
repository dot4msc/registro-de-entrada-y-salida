const express = require("express")
const router = express.Router()
const Log = require("../models/Log")

router.post('/checkin', async (req, res) => {
  const {name} = req.body
  const date = new Date().toISOString().split('T')[0]
  const log = new Log({name, action: "entrada", date})
  await log.save()
  res.send({success: true})
})

router.post('/checkout', async (req, res) => {
  const {name} = req.body
  const date = new Date().toISOString().split('T')[0]
  const log = new Log({name, action: "salida", date})
  await log.save()
  res.send({success: true})
})

module.exports = router