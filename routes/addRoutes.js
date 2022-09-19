const { Router } = require('express')
const Product = require('../models/Product')
const router = new Router()

router.get('/', (req, res) => {
  res.render('add')
})

router.post('/', async (req, res) => {
  try {
    const { title, price, img, description, userId } = req.body

    const product = new Product({
      title,
      price,
      img,
      description,
      userId,
    })

    await product.save()
    return res.redirect('/products')
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
