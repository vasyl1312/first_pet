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
router.get('/', isAuth, async (req, res) => {
  try {
    const products = await Product.find({ userId: req.user._id })
    let base_url = process.env.BASE_URL_PORT

    res.render('myProducts', { alert, products, base_url })
    alert.type = ''
    alert.message = ''
  } catch (e) {
    console.error(e)
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
      return res.redirect('/my_products')
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
    if (req.body.myCheckbox.length == 2) {
      req.body.myCheckbox = true //перевіряємо чи активний продукт чи ні
    }

    if (req.file) {
      if (req.body.img != '/images/empty.png') {
        var filePath = `./${req.body.img}` //видаляєм старе фото з бази
        fs.unlinkSync(filePath)
      }
      req.body.img = req.file.path
    }

    const product = await Product.findById(id)
    if (!isOwner(product, req)) {
      return res.redirect('/my_products')
    }
    ;(req.body.date = new Date()), Object.assign(product, req.body)
    await product.save()
    alert.type = 'success'
    alert.message = 'Your product has been successfully edited'
    res.redirect('/my_products')
  } catch (e) {
    console.log(e)
  }
})

router.post('/:id/remove', isAuth, async (req, res) => {
  const products = await Product.deleteOne({ _id: req.body.productId })
  //видалення id продукта з улюблених усіх користувачів
  const users = await User.find()
  for (let i = 0; i < users.length; i++) {
    let elem = Object.values(users[i].favourite).filter((e) => e !== req.body.productId)
    users[i].favourite = elem
    await users[i].save()
  }

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
  res.redirect('/my_products')
})

module.exports = router
