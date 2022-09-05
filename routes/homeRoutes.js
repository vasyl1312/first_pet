const { Router } = require('express')
const router = new Router()

router.get('/', function (req, res) {
  return res.redirect('home.html')
})

module.exports = router
