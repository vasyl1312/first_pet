const { Router } = require('express')
const Favourite = require('../models/Favourite')
const User = require('../models/User')
const Product = require('../models/Product')
const isAuth = require('../middleware/isAuth') //якщо користувач зареєстрований то доступні роути

const router = new Router()

router.post('/add', isAuth, async (req, res) => {
  try {
    let { productId, title, img, price, userId, userInSession } = req.body

    //перевірка чи наш продукт вже є в улюблених
    const productInFavorites = await Favourite.findOne({ productId })
    if (productInFavorites != null) {
      alert.type = 'warning'
      alert.message = 'This product is already in favorites'
      return res.redirect('/favourite')
    }

    //щоб не можна було додавати свій же продукт
    const product = await Product.findById(productId)
    if (product.userId == userInSession) {
      alert.type = 'warning'
      alert.message = 'You can`t add your own product to favorites'
      return res.redirect('/favourite')
    }

    const favourite = new Favourite({
      productId,
      title,
      img,
      price,
      ownerId: userId,
      userInSession,
    })

    await favourite.save()
    alert.type = 'success'
    alert.message = 'This product has been successfully added to favourite'
    res.redirect('/favourite')
  } catch (e) {
    console.log(e)
  }
})

router.post('/remove/:id', isAuth, async (req, res) => {
  try {
    const favourite = await Favourite.deleteOne({ _id: req.body.productId })
    alert.type = 'success'
    alert.message = 'This product has been successfully removed from favourite'
    res.redirect('/favourite')
  } catch (e) {
    console.log(e)
  }
})

let alert = { type: '', message: '' }
router.get('/', isAuth, async (req, res) => {
  const userInSession = await User.findById(req.user._id)
  const favourite = await Favourite.find({ userInSession: userInSession._id })
  res.render('favourite', { favourite, alert, userInSession })
  alert.type = ''
  alert.message = ''
})

module.exports = router
