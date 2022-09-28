const { Router } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const router = new Router()

let alert = { type: '', message: '' }
router.get('/', (req, res) => {
  res.render('login', { alert })
  alert.type = ''
  alert.message = ''
})

router.post('/', async (req, res) => {
  try {
    const email = req.body.email
    const password = req.body.password

    const candidate = await User.findOne({ email }) //перевірка чи існує користувач з таким email
    if (!candidate) {
      alert.type = 'warning'
      alert.message = 'This email is not exists, please try again'
      return res.redirect('/login')
    } else {
      const areSame = await bcrypt.compare(password, candidate.password) //перевірка і розхеш пароль
      if (!areSame) {
        alert.type = 'danger'
        alert.message = 'This password is incorrect'
        return res.redirect('/login')
      }

      const user = await User.findById('633339e0f1b90408b2b88c6d')
      req.session.user = user
      req.session.isAuthenticated = true
      return res.redirect('/')
    }
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
