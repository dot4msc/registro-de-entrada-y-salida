const express = require("express")
const cors = require("cors")

const logroutes = require("./routes/logroutes")

const PORT = process.env.PORT | 3001
const app = express()

app.use(cors())
app.use(express.json());
app.use('/api', logroutes);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
