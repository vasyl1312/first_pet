const { Router } = require('express')
const Order = require('../models/Order')
const router = new Router()

router.get('/', async (req, res) => {
  res.render('orders', {
    isOrder: true,
  })
})

router.post('/', async (req, res) => {
  res.redirect('/orders')
})

module.exports = router
