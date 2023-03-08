const { Router } = require('express')
const Product = require('../models/Product')
const User = require('../models/User')
const isAuth = require('../middleware/isAuth')
const router = Router()

let alert = { type: '', message: '' }
router.get('/', async (req, res) => {
  try {
    let base_url = process.env.BASE_URL_PORT
    const products = await Product.find({ categories: 'python' })
    res.render('python', { alert, products, base_url })

    alert.type = ''
    alert.message = ''
  } catch (e) {
    console.error(e)
  }
})

//для оброблення route коли перейшли на --read--
router.get('/:id', isAuth, async (req, res) => {
  readProduct(req, res)
})

module.exports = router
