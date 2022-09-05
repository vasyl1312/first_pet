const { Router } = require('express')
const router = new Router()

router.get('/', (req, res) => {
  res.render('login')
  return res.redirect('login.html')
})

module.exports = router
