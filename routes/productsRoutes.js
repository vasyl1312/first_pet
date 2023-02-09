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
      .populate('userId', 'email name') //populate отримуємо(а select певні)дані про user
      .select('price title img')
    res.render('products', { alert, products })
    alert.type = ''
    alert.message = ''
  } catch (e) {
    console.error(e)
  }
})

//для оброблення route коли перейшли на --read--
router.get('/:id', isAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    let img = product.img
    if (img != '/images/empty.png') {
      img = '/' + img
    }
    const userInSession = await User.findById(req.user._id)

    res.render('product', { product, userInSession, img })
  } catch (e) {
    console.log(e)
  }
})

//для редагування портфоліо переходимо на саму сторінку
router.get('/:id/edit', isAuth, async (req, res) => {
  alert.type = 'warning'
  alert.message = 'This product you are not allowed to edit'
  if (!req.query.allow) {
    alert.type = ''
    alert.message = ''
    return res.redirect('/') //allow потім для розподілу між клієнтом і власником
  }

  try {
    const product = await Product.findById(req.params.id)
    //забороняємо переходити на сторінку зміни продукту якщо по id не я його створив
    if (!isOwner(product, req)) {
      return res.redirect('/products')
    }

    res.render('productEdit', { product })
  } catch (e) {
    console.log(e)
  }
})

//тут редагування
router.post('/edit', isAuth, async (req, res) => {
  try {
    const { id } = req.body //забираємо нижнє _ щоб було не _id а id
    delete req.body.id //щоб передати все оновлене окрім id-його залишити

    if (req.file) {
      if (req.body.img != '/images/empty.png') {
        var filePath = `./${req.body.img}` //видаляєм старе фото з бази
        fs.unlinkSync(filePath)
      }
      req.body.img = req.file.path
    }

    const product = await Product.findById(id)
    if (!isOwner(product, req)) {
      return res.redirect('/products')
    }

    Object.assign(product, req.body)
    await product.save()
    console.log(product)
    alert.type = 'success'
    alert.message = 'Your product has been successfully edited'
    res.redirect('/products')
  } catch (e) {
    console.log(e)
  }
})

router.post('/:id/remove', isAuth, async (req, res) => {
  const products = await Product.deleteOne({ _id: req.body.productId })

  if (req.body.img != '/images/empty.png') {
    var filePath = `./${req.body.img}` //видаляєм старе фото з бази
    fs.unlinkSync(filePath)
  }

  //видалення продукту і з модельки користувача
  const user = await User.findById(req.body.userId)
  let i = 0
  user.products.forEach((element) => {
    if (element == req.body.productId) user.products.splice(i, 1)
    ++i
  })
  await user.save()

  alert.type = 'success'
  alert.message = 'Your product has been successfully deleted'
  res.redirect('/products')
})

module.exports = router
