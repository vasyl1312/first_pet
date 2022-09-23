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
    alert.type = 'success'
    alert.message = 'This product has been successfully added to cart'
    res.redirect('/card')
  } catch (e) {
    console.log(e)
  }
})

router.post('/remove/:id', async (req, res) => {
  try {
    let productId = req.body.productId
    const card = await Card.deleteOne({ _id: productId })
    alert.type = 'success'
    alert.message = 'This product has been successfully removed from cart'
    res.redirect('/card')
  } catch (e) {
    console.log(e)
  }
})

let alert = { type: '', message: '' }
router.get('/', async (req, res) => {
  const card = await Card.find()
  res.render('card', { card, alert })
  alert.type = ''
  alert.message = ''
})

module.exports = router
