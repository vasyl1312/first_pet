const { Router } = require('express')
const isAuth = require('../middleware/isAuth')
const router = new Router()

router.get('/', isAuth, (req, res) => {
  res.render('history')
})

router.post('/', isAuth, (req, res) => {
  console.log(req.session.user) //user in session
  console.log(req.body) //product
  res.render('history')
})
module.exports = router
