const { Router } = require('express')
const mongoose = require('mongoose')

const router = new Router()

var db = mongoose.connection

router.post('/register', function (req, res) {
  var name = req.body.name
  var email = req.body.email
  var password = req.body.password

  var data = { name, email, password }
  db.collection('users').insertOne(data, function (err, collection) {
    if (err) throw err
    console.log('Record inserted Successfully')
  })

  return res.redirect('welcome.html')
})

router.get('/', function (req, res) {
  return res.redirect('index.html')
})

module.exports = router
