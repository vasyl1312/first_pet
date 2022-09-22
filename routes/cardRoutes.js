const { Router } = require('express')
const Card = require('../models/Card')
const Product = require('../models/Product')

const router = new Router()

router.post('/add', async (req, res) => {
  try {
    let { productId, title, img, price } = req.body

    const card = new Card({
      products: {
        productId,
        title,
        price,
        img,
      },
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
