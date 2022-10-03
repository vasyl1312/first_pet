const { Router } = require('express')
const isAuth = require('../middleware/isAuth') //якщо користувач зареєстрований то доступні роути
const router = Router()

router.get('/', async (req, res) => {
  res.render('profile', {
    user: req.user.toObject(),
  })
})

router.post('/', isAuth, async (req, res) => {})

module.exports = router
