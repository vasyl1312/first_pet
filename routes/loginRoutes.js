const { Router } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const router = new Router()

let alert = { type: '', message: '' }
router.get('/', (req, res) => {
  res.render('login', { alert, isLogin: true })
  alert.type = ''
  alert.message = ''
})

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body
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

      req.session.user = candidate //додаємо користувача якщо все ок
      req.session.isAuthenticated = true // для того щоб деякі могли міняти контент а деякі не мають дозволу
      await req.session.save((err) => {
        if (err) {
          console.log(err)
          throw err
        }
      })
      res.redirect('/')
    }
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
