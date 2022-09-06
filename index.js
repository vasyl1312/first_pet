var express = require('express')
var bodyParser = require('body-parser')
const mongoose = require('mongoose')
const keys = require('./config/keys.json')
const homeRoutes = require('./routes/homeRoutes')
const registerRoutes = require('./routes/registerRoutes')
const loginRoutes = require('./routes/loginRoutes')
const welcomeRoutes = require('./routes/welcomeRoutes')

const PORT = process.env.PORT || keys.PORT
var app = express()

app.use(bodyParser.json())
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use('/', homeRoutes)
app.use('/register', registerRoutes)
app.use('/login', loginRoutes)
app.use('/welcome', welcomeRoutes)

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
