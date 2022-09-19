const { Router } = require('express')
const Product = require('../models/Product')
const router = Router()

router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    res.render('products', { products })
  } catch (e) {
    console.error(e)
  }
})

//для оброблення route коли перейшли на --read--
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    res.render('product', { product })
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
