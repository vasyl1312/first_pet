const { Router } = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const router = new Router()

router.post('/', async function (req, res) {
  try {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    //шифруємо пароль коли реєструємось, 10 це ніби рівень шифрування чим більше тим важче і довше
    const hashPassword = await bcrypt.hash(password, 10)
    const candidate = await User.findOne({ email }) //перевірка чи існує користувач з таким email
    if (candidate) {
      return res.redirect('/')
    } else {
      //якщо користувача нема то реєcтруємо його
      const user = new User({
        name,
        email,
        password: hashPassword,
      })
      await user.save()
      return res.redirect('welcome.html')
    }
  } catch (e) {
    console.log(e)
  }
})

router.get('/', function (req, res) {
  return res.redirect('register.html')
})

module.exports = router
