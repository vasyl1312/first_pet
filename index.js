var express = require('express')
var bodyParser = require('body-parser')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoSession = require('connect-mongodb-session')(session)

const keys = require('./config/keys.json')
const addRoutes = require('./routes/addRoutes')
const homeRoutes = require('./routes/homeRoutes')
const cardRoutes = require('./routes/cardRoutes')
const userMiddlware = require('./middleware/user')
const loginRoutes = require('./routes/loginRoutes')
const errorMiddleware = require('./middleware/error')
const varMiddlware = require('./middleware/variables')
const registerRoutes = require('./routes/registerRoutes')
const productsRoutes = require('./routes/productsRoutes')
const resetPassword = require('./routes/resetPasswordRoutes')

const PORT = process.env.PORT || keys.PORT
var app = express()

app.use(bodyParser.json())
app.use(express.static(__dirname + '/views'))
const mongoSession = new MongoSession({
  collection: 'sessions',
  uri: keys.MongoUri,
})

app.engine('ejs', require('ejs').renderFile)
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  session({ secret: keys.SESSION_SECRET, resave: false, saveUninitialized: false, mongoSession })
)
app.use(varMiddlware)
app.use(userMiddlware)

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/card', cardRoutes)
app.use('/login', loginRoutes)
app.use('/register', registerRoutes)
app.use('/products', productsRoutes)
app.use('/login/reset', resetPassword)

app.use(errorMiddleware) //вкінці бо деякі роути будуть не доступні(для того щоб не можна на невідомі роути)

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
