const { Router } = require('express')
const User = require('../models/User')
const router = new Router()
const passport = require('passport')
require('../middleware/googleAuth')(passport)

router.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get(
  '/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  async (req, res) => {
    try {
      let email = req.user.email
      const candidate = await User.findOne({ email })

      req.session.user = candidate //додаємо користувача якщо все ок
      req.session.isAuthenticated = true // для того щоб деякі могли міняти контент а деякі не мають дозволу
      await req.session.save((err) => {
        if (err) {
          console.log(err)
          throw err
        }
      })
      res.redirect('/')
    } catch (error) {
      console.log(error)
    }
  }
)

module.exports = router
