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

router.post('/remove/:id', async (req, res) => {
  let productId = req.body.productId
  const card = await Card.deleteOne({ _id: productId })
  res.redirect('/card')
})

router.get('/', async (req, res) => {
  const card = await Card.find()
  res.render('card', { card })
})

module.exports = router
