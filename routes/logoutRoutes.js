const { Router } = require('express')
const router = new Router()

router.get('/', async (req, res) => {
  //ощичуємо сесію
  req.session.destroy(() => {
    res.redirect('/login')
  })
})

module.exports = router
