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

//для редагування курсів переходимо на саму сторінку
router.get('/:id/edit', async (req, res) => {
  //allow потім для розподілу між клієнтом і власником
  if (!req.query.allow) return res.redirect('/')

  try {
    const product = await Product.findById(req.params.id)
    res.render('productEdit', { product })
  } catch (e) {
    console.log(e)
  }
})

//тут редагування
router.post('/edit', async (req, res) => {
  const { id } = req.body //забираємо нижнє _ щоб було не _id а id

  try {
    delete req.body.id
    const product = await Product.findById(id)

    Object.assign(product, req.body)
    await product.save()
    res.redirect('/products')
  } catch (e) {
    console.log(e)
  }
})

router.post('/:id/remove', async (req, res) => {
  let productId = req.body.productId
  const products = await Product.deleteOne({ _id: productId })
  res.redirect('/products')
})

module.exports = router
