const { Router } = require('express')
const router = new Router()

router.get('/', (req, res) => {
  res.render('login')
})

module.exports = router
