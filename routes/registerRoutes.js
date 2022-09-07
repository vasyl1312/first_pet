const { Router } = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const router = new Router()

router.post('/', async (req, res) => {
  try {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    if (name.length < 3) {
      console.log('Ім`я повинне мати більше ніж 3 літери')
      return res.redirect('/register')
    }
    if (password.length < 6) {
      console.log('Пароль повинен мати більше ніж 6 символів')
      return res.redirect('/register')
    }
    //шифруємо пароль коли реєструємось, 10 це ніби рівень шифрування чим більше тим важче і довше
    const hashPassword = await bcrypt.hash(password, 10)
    const candidate = await User.findOne({ email }) //перевірка чи існує користувач з таким email
    if (candidate) {
      console.log('Користувач з таким email уже існує, будь ласка, спробуйте інший email')
      return res.redirect('/register')
    } else {
      //якщо користувача нема то реєcтруємо його
      const user = new User({
        name,
        email,
        password: hashPassword,
      })
      await user.save()
      res.render('login')
    }
  } catch (e) {
    console.log(e)
  }
})

router.get('/', (req, res) => {
  res.render('register')
})

module.exports = router
