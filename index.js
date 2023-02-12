var express = require('express')
require('dotenv').config()
var bodyParser = require('body-parser')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoSession = require('connect-mongodb-session')(session)

const addRoutes = require('./routes/addRoutes')
const homeRoutes = require('./routes/homeRoutes')
const javaRoutes = require('./routes/javaRoutes')
const profileRoutes = require('./routes/profile')
const userMiddlware = require('./middleware/user')
const otherRoutes = require('./routes/otherRoutes')
const loginRoutes = require('./routes/loginRoutes')
const fileMiddleware = require('./middleware/file')
const pythonRoutes = require('./routes/pythonRoutes')
const googleRoutes = require('./routes/googleRoutes')
const errorMiddleware = require('./middleware/error')
const varMiddlware = require('./middleware/variables')
const historyRoutes = require('./routes/historyRoutes')
const backendRoutes = require('./routes/backendRoutes')
const frontendRoutes = require('./routes/frontendRoutes')
const registerRoutes = require('./routes/registerRoutes')
const productsRoutes = require('./routes/productsRoutes')
const c_similarRoutes = require('./routes/c_similarRoutes')
const favouriteRoutes = require('./routes/favouriteRoutes')
const resetPassword = require('./routes/resetPasswordRoutes')
const web_designRoutes = require('./routes/web_designRoutes')
const javascriptRoutes = require('./routes/javascriptRoutes')
const my_productsRoutes = require('./routes/my_productsRoutes')

const PORT = process.env.PORT
var app = express()

app.use(bodyParser.json())
app.use(express.static(__dirname + '/views'))
app.use('/images', express.static(__dirname + '/images'))
const mongoSession = new MongoSession({
  collection: 'sessions',
  uri: process.env.MongoUri,
})

app.engine('ejs', require('ejs').renderFile)
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    mongoSession,
  })
)
app.use(fileMiddleware.single('avatar'))
app.use(varMiddlware)
app.use(userMiddlware)

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/java', javaRoutes)
app.use('/login', loginRoutes)
app.use('/other', otherRoutes)
app.use('/google', googleRoutes)
app.use('/python', pythonRoutes)
app.use('/backend', backendRoutes)
app.use('/profile', profileRoutes)
app.use('/history', historyRoutes)
app.use('/frontend', frontendRoutes)
app.use('/register', registerRoutes)
app.use('/products', productsRoutes)
app.use('/c_similar', c_similarRoutes)
app.use('/favourite', favouriteRoutes)
app.use('/login/reset', resetPassword)
app.use('/web_design', web_designRoutes)
app.use('/javascript', javascriptRoutes)
app.use('/my_products', my_productsRoutes)

app.use(errorMiddleware) //вкінці бо деякі роути будуть не доступні(для того щоб не можна на невідомі роути)

const start = async () => {
  try {
    await mongoose.connect(`${process.env.MongoUri}`)
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
