const { Router } = require('express')
const bcrypt = require('bcryptjs')
const Sib = require('sib-api-v3-sdk')
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

    //шифруємо пароль коли реєструємось, 10 це ніби рівень шифрування чим більше тим важче і довше
    const hashPassword = await bcrypt.hash(password, 10)
    const candidate = await User.findOne({ email }) //перевірка чи існує користувач з таким email
    if (candidate) {
      alert.type = 'warning'
      alert.message = 'This email address is already exist, please choose a different email address'
      return res.redirect('/register')
    } else {
      //якщо користувача нема то реєcтруємо його
      const user = new User({
        name,
        email,
        password: hashPassword,
        avatarUrl: emptyAvatar,
      })

      //і відсилаємо на email лист від користувача в сесії
      Sib.ApiClient.instance.authentications['api-key'].apiKey = process.env.API_KEY_BLUE
      await user.save()
      alert.type = 'success'
      alert.message = 'Account has been created'
      const tranEmailApi = new Sib.TransactionalEmailsApi()
      await tranEmailApi.sendTransacEmail(regMail(email, name)).catch((error) => {
        console.error(error)
      })
      res.render('login', { alert })
    }
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
