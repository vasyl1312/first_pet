const { Router } = require('express')
const Product = require('../models/Product')
const router = Router()

let alert = { type: '', message: '' }
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('userId', 'email name') //populate отримуємо(а select певні)дані про user
    // .select('price title img')
    // console.log(products)
    res.render('products', { products, alert })
    alert.type = ''
    alert.message = ''
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
  if (!req.query.allow) return res.redirect('/') //allow потім для розподілу між клієнтом і власником

  try {
    const product = await Product.findById(req.params.id)
    res.render('productEdit', { product })
  } catch (e) {
    console.log(e)
  }
})

//тут редагування
router.post('/edit', async (req, res) => {
  try {
    const { id } = req.body //забираємо нижнє _ щоб було не _id а id
    delete req.body.id //щоб передати все оновлене окрім id-його залишити

    await Product.findByIdAndUpdate(id, req.body)
    alert.type = 'success'
    alert.message = 'Your product has been successfully edited'
    res.redirect('/products')
  } catch (e) {
    console.log(e)
  }
})

router.post('/:id/remove', async (req, res) => {
  const products = await Product.deleteOne({ _id: req.body.productId })
  alert.type = 'success'
  alert.message = 'Your product has been successfully deleted'
  res.redirect('/products')
})

module.exports = router
