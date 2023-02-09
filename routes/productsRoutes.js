const { Router } = require('express')
var fs = require('fs')
const Product = require('../models/Product')
const User = require('../models/User')
const isAuth = require('../middleware/isAuth')
const router = Router()

//функція для розподілу, якщо користувач створив курс то редагує - інші перегляд і придбання
function isOwner(product, req) {
  return product.userId.toString() === req.user._id.toString()
}

let alert = { type: '', message: '' }
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    res.render('products', { alert, products })
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
    let img = product.img
    if (img != '/images/empty.png') {
      img = '/' + img
    }

    //щоб не авторизовані могли читати а інші додавати до улюблених
    if (req.session.isAuthenticated) {
      const userInSession = await User.findById(req.user._id)
      res.render('product', { product, userInSession, img })
    } else res.render('product', { product, img })
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
