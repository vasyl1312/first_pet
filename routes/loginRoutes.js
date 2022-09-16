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
      alert.message = 'Користувача з таким email немає, будь ласка, спробуйте ще раз'
      return res.redirect('/login')
    } else {
      const areSame = await bcrypt.compare(password, candidate.password) //перевірка і розхеш пароль
      if (!areSame) {
        alert.type = 'danger'
        alert.message = 'Пароль неправильний, спробуйте ще раз'
        return res.redirect('/login')
      }

      return res.redirect('/')
    }
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
