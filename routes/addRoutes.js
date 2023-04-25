const { Router } = require('express')
const Product = require('../models/Product')
const User = require('../models/User')
const EMPTYIMG = '/images/empty.png'
const isAuth = require('../middleware/isAuth') //якщо користувач зареєстрований то доступні роути
const router = new Router()

let alert = { type: '', message: '' }
router.get('/', isAuth, (req, res) => {
  res.render('add', { alert })
  alert.type = ''
  alert.message = ''
})

router.post('/', isAuth, async (req, res) => {
  try {
    let { title, price, img, description, categories } = req.body
    if (!description) {
      alert.type = 'info'
      alert.message = 'You should write description more than 50 letters'
      return res.redirect('/add')
    }
    if (!categories) {
      alert.type = 'info'
      alert.message = 'You should select at least one category'
      return res.redirect('/add')
    }

    if (!req.file) {
      img = EMPTYIMG
    } else {
      img = req.file.path
    }

    const product = new Product({
      title,
      price,
      img,
      description,
      categories,
      userId: req.user,
      date: new Date(),
    })
    await product.save()

    //в модель користувача додаємо продукт
    const user = await User.findById(req.user)
    user.products.push(product._id)
    await user.save()
    return res.redirect('/products')
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
