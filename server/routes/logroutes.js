const express = require("express")
const router = express.Router()
const Log = require("../models/Log")
const { appendToSheets } = require("../utils/googleSheets")

router.post('/checkin', async (req, res) => {
  const {name} = req.body
  const date = new Date().toISOString().split('T')[0]
  const log = new Log({name, action: "entrada", date})

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
  const date = new Date().toISOString().split('T')[0]
  const log = new Log({name, action: "salida", date})
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