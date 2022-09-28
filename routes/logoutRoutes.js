const { Router } = require('express')
const isAuth = require('../middleware/isAuth')
const router = new Router()

router.get('/', isAuth, async (req, res) => {
  //ощичуємо сесію
  req.session.destroy(() => {
    res.redirect('/login')
  })
})

module.exports = router
