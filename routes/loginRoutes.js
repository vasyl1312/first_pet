const { Router } = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

const router = new Router()

router.get('/', (req, res) => {
  res.render('login')
})

router.post('/', async (req, res) => {
  try {
    const email = req.body.email
    const password = req.body.password

    const candidate = await User.findOne({ email }) //перевірка чи існує користувач з таким email
    if (!candidate) {
      //нема такого користувача
      return res.redirect('/register')
    } else {
      const areSame = await bcrypt.compare(password, candidate.password) //перевірка і розхеш пароль
      if (!areSame) {
        //неправильний пароль
        return res.redirect('/login')
      }

      return res.redirect('/welcome')
    }
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
