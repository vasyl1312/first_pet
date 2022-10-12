const { Router } = require('express')
const Favourite = require('../models/Favourite')
const User = require('../models/User')
const isAuth = require('../middleware/isAuth') //якщо користувач зареєстрований то доступні роути

const router = new Router()

router.post('/add', isAuth, async (req, res) => {
  try {
    let { productId, title, img, price, userId, userInSession } = req.body
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
  res.render('favourite', { favourite, alert })
  alert.type = ''
  alert.message = ''
})

module.exports = router
