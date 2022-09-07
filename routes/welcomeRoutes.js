const { Router } = require('express')
const router = new Router()

router.get('/', (req, res) => {
  res.render('welcome')
})

module.exports = router
