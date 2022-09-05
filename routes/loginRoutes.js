const { Router } = require('express')
const User = require('../models/User')
const router = new Router()

router.get('/', (req, res) => {
  return res.redirect('login.html')
})

router.post('/', async (req, res) => {
  try {
    const email = req.body.email
    const password = req.body.password

    const candidate = await User.findOne({ email }) //перевірка чи існує користувач з таким email
    if (!candidate) {
      return res.redirect('/')
    } else {
      //перевірити і розхешити пароль

      return res.redirect('welcome.html')
    }
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
