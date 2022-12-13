const { Router } = require('express')
const Favourite = require('../models/Favourite')
const User = require('../models/User')
const Product = require('../models/Product')
const isAuth = require('../middleware/isAuth') //якщо користувач зареєстрований то доступні роути

const router = new Router()

router.post('/add', isAuth, async (req, res) => {
  try {
    let { productId, userInSession } = req.body

    const userInSessions = await User.findById(userInSession)

    //перевірка чи наш продукт вже є в улюблених
    for (let i = 0; i < userInSessions.favourite.length; i++) {
      if (productId == userInSessions.favourite[i]) {
        alert.type = 'warning'
        alert.message = 'This product is already in favorites'
        return res.redirect('/favourite')
      }
    }

    //щоб не можна було додавати свій же продукт
    const product = await Product.findById(productId)
    if (product.userId == userInSession) {
      alert.type = 'warning'
      alert.message = 'You can`t add your own product to favorites'
      return res.redirect('/favourite')
    }

    const user = await User.findById(userInSession)
    user.favourite.push(productId)
    await user.save()

    alert.type = 'success'
    alert.message = 'This product has been successfully added to favourite'
    res.redirect('/favourite')
  } catch (e) {
    console.log(e)
  }
})

router.post('/remove/:id', isAuth, async (req, res) => {
  try {
    //видалення продукту і з модельки користувача
    const user = await User.findById(req.body.userInSession)
    let i = 0
    user.favourite.forEach((element) => {
      if (element == req.body.productId) user.favourite.splice(i, 1)
      ++i
    })
    await user.save()

    alert.type = 'success'
    alert.message = 'This product has been successfully removed from favourite'
    res.redirect('/favourite')
  } catch (e) {
    console.log(e)
  }
})

let alert = { type: '', message: '' }
router.get('/', isAuth, async (req, res) => {
  let favourite = []
  const userInSession = await User.findById(req.user._id)
  for (let i = 0; i < userInSession.favourite.length; i++) {
    favourite.push(await Product.findById(userInSession.favourite[i]))
  }
  res.render('favourite', { favourite, alert, userInSession })
  alert.type = ''
  alert.message = ''
})

module.exports = router
