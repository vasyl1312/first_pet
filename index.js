var express = require('express')
var bodyParser = require('body-parser')
const mongoose = require('mongoose')
const keys = require('./config/keys.json')
const homeRoutes = require('./routes/homeRoutes')
const registerRoutes = require('./routes/registerRoutes')
const loginRoutes = require('./routes/loginRoutes')
const welcomeRoutes = require('./routes/welcomeRoutes')
const addRoutes = require('./routes/addRoutes')
const productsRoutes = require('./routes/productsRoutes')
const cardRoutes = require('./routes/cardRoutes')
const ordersRoutes = require('./routes/ordersRoutes')
const User = require('./models/User')

const PORT = process.env.PORT || keys.PORT
var app = express()

app.use(bodyParser.json())
app.use(express.static(__dirname + '/views'))
app.engine('ejs', require('ejs').renderFile)
app.set('view engine', 'ejs')
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(async (req, res, next) => {
  try {
    const user = await User.findById('631710599ef60667c848ba19')
    req.user = user
    next()
  } catch (e) {
    console.log(e)
  }
})

app.use('/', homeRoutes)
app.use('/register', registerRoutes)
app.use('/login', loginRoutes)
app.use('/welcome', welcomeRoutes)
app.use('/add', addRoutes)
app.use('/products', productsRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)

const start = async () => {
  try {
    await mongoose.connect(`${keys.MongoUri}`)

    const candidate = await User.findOne()
    //якщо в нас нема користувачів то створюємо
    if (!candidate) {
      const user = new User({
        email: 'vasylhrytseeeeee@knu.ua',
        name: 'fffffff',
        cart: { items: [] },
      })
      await user.save()
    }

    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
