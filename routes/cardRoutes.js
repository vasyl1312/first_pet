const { Router } = require('express')
const Card = require('../models/Card')
const Product = require('../models/Product')

const router = new Router()

router.post('/add', async (req, res) => {
  try {
    const productId = await Product.findById(req.body.id) //отримуємо id об'єкта якого хочемо купити
    const product = await Product.findOne({ productId })
    const card = new Card({
      productId,
    })
    await card.save()
    res.redirect('/card')
  } catch (e) {
    console.log(e)
  }
})

router.get('/', async (req, res) => {
  const card = await Card.find()
  res.render('card', { card })
})

module.exports = router
