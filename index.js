const express = require('express')
const mongoose = require('mongoose')

const keys = require('./config/keys.json')
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())

const start = async () => {
  try {
    await mongoose.connect(`${keys.MongoUri}`)
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
