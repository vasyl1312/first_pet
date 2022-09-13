const { Router } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

const router = new Router()

router.get('/', (req, res) => {
  res.render('login', {})
})

router.post('/', async (req, res) => {
  try {
    const email = req.body.email
    const password = req.body.password

    const candidate = await User.findOne({ email }) //перевірка чи існує користувач з таким email
    if (!candidate) {
      loginError = 'Користувача з таким email немає, будь ласка, спробуйте ще раз'
      console.log(loginError)

      return res.redirect('/login')
    } else {
      const areSame = await bcrypt.compare(password, candidate.password) //перевірка і розхеш пароль
      if (!areSame) {
        console.log('Пароль неправильний, спробуйте ще раз')
        return res.redirect('/login')
      }

      return res.redirect('/')
    }
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
