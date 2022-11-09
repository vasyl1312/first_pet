var express = require('express')
var bodyParser = require('body-parser')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoSession = require('connect-mongodb-session')(session)

const keys = require('./config/keys.json')
const addRoutes = require('./routes/addRoutes')
const profileRoutes = require('./routes/profile')
const homeRoutes = require('./routes/homeRoutes')
const userMiddlware = require('./middleware/user')
const loginRoutes = require('./routes/loginRoutes')
const fileMiddleware = require('./middleware/file')
const errorMiddleware = require('./middleware/error')
const varMiddlware = require('./middleware/variables')
const historyRoutes = require('./routes/historyRoutes')
const registerRoutes = require('./routes/registerRoutes')
const productsRoutes = require('./routes/productsRoutes')
const favouriteRoutes = require('./routes/favouriteRoutes')
const resetPassword = require('./routes/resetPasswordRoutes')

const PORT = process.env.PORT || keys.PORT
var app = express()

app.use(bodyParser.json())
app.use(express.static(__dirname + '/views'))
app.use('/images', express.static(__dirname + '/images'))
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
app.use(fileMiddleware.single('avatar'))
app.use(varMiddlware)
app.use(userMiddlware)

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/login', loginRoutes)
app.use('/profile', profileRoutes)
app.use('/history', historyRoutes)
app.use('/register', registerRoutes)
app.use('/products', productsRoutes)
app.use('/favourite', favouriteRoutes)
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
