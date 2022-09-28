const { Router } = require('express')
const isAuth = require('../middleware/isAuth')
const router = new Router()

router.get('/logout', isAuth, async (req, res) => {
  //ощичуємо сесію
  req.session.destroy(() => {
    res.redirect('/login')
  })
})

router.get('/', (req, res) => {
  res.render('home')
})

module.exports = router
