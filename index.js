const express = require('express')
const mongoose = require('mongoose')

const keys = require('./config/keys.json')
const homeRoutes = require('./routes/homeRoutes')
const loginRoutes = require('./routes/loginRoutes')
const registerRoutes = require('./routes/registerRoutes')

const PORT = process.env.PORT || 5000
const app = express()

app.set('view engine', 'ejs')
app.use('/', homeRoutes)
app.use('/login', loginRoutes)
app.use('/register', registerRoutes)

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
