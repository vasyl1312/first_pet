const { Router } = require('express')
var fs = require('fs')
const Product = require('../models/Product')
const readProduct = require('../middleware/readProduct')
const User = require('../models/User')
const isAuth = require('../middleware/isAuth')
const router = Router()

//функція для розподілу, якщо користувач створив продукт то в загальному списку має бачити свої
function isOwner(products, req) {
  let myProd = []
  let elseProd = []
  let result = []
  products.forEach((product) => {
    if (product.userId.toString() === req.user._id.toString()) myProd.push(product)
    else elseProd.push(product)
  })
  result.push(myProd, elseProd)
  return result
}

let alert = { type: '', message: '' }
router.get('/', async (req, res) => {
  try {
    let base_url = process.env.BASE_URL_PORT
    if (req.session.user) {
      const products = await Product.find()
      const ownProducts = isOwner(products, req)
      const myProd = ownProducts[0]
      const elseProd = ownProducts[1]
      res.render('products', { alert, elseProd, myProd, base_url })
      alert.type = ''
      alert.message = ''
    } else {
      const elseProd = await Product.find()
      const myProd = []
      res.render('products', { alert, elseProd, myProd, base_url })
      alert.type = ''
      alert.message = ''
    }
  } catch (e) {
    console.error(e)
  }
})

//для оброблення route коли перейшли на --read--
router.get('/:id', async (req, res) => {
  readProduct(req, res)
})

module.exports = router
