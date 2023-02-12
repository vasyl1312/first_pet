const { Router } = require('express')
const bcrypt = require('bcryptjs')
const sgMail = require('@sendgrid/mail')
const keys = require('../config/keysSecure.json')
const User = require('../models/User')
const regMail = require('../email/register')
const emptyAvatar = '/images/emptyAvatar.png'
const router = new Router()

let alert = { type: '', message: '' }
router.get('/', (req, res) => {
  res.render('register', { alert })
  alert.type = ''
  alert.message = ''
})

router.post('/', async (req, res) => {
  try {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    if (name.length < 3) {
      alert.type = 'info'
      alert.message = 'Your name must be at least 3 characters long'
      return res.redirect('/register')
    }
    if (password.length < 6) {
      alert.type = 'info'
      alert.message = 'Your password must be at least 6 characters long'
      return res.redirect('/register')
    }
    //шифруємо пароль коли реєструємось, 10 це ніби рівень шифрування чим більше тим важче і довше
    const hashPassword = await bcrypt.hash(password, 10)
    const candidate = await User.findOne({ email }) //перевірка чи існує користувач з таким email
    if (candidate) {
      alert.type = 'warning'
      alert.message = 'This email address is already, please choose a different email address'
      return res.redirect('/register')
    } else {
      //якщо користувача нема то реєcтруємо його
      const user = new User({
        name,
        email,
        password: hashPassword,
        avatarUrl: emptyAvatar,
      })

      sgMail.setApiKey(keys.API_KEY) //транспортер для відправлення по апі ключу сенд гріда емейл
      await user.save()
      alert.type = 'success'
      alert.message = 'Account has been created'
      await sgMail.send(regMail(email, name)).catch((error) => {
        console.error(error)
      })
      res.render('login', { alert })
    }
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
