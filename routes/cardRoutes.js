const { Router } = require('express')
const Card = require('../models/Card')
const User = require('../models/User')
const isAuth = require('../middleware/isAuth') //якщо користувач зареєстрований то доступні роути

const router = new Router()

router.post('/add', isAuth, async (req, res) => {
  try {
    let { productId, title, userId } = req.body
    const card = new Card({
      productId,
      title,
      ownerId: userId,
    })

    await card.save()
    alert.type = 'success'
    alert.message = 'This product has been successfully added to cart'
    res.redirect('/card')
  } catch (e) {
    console.log(e)
  }
})

router.post('/remove/:id', isAuth, async (req, res) => {
  try {
    const card = await Card.deleteOne({ _id: req.body.productId })
    alert.type = 'success'
    alert.message = 'This product has been successfully removed from cart'
    res.redirect('/card')
  } catch (e) {
    console.log(e)
  }
})

let alert = { type: '', message: '' }
router.get('/', isAuth, async (req, res) => {
  const card = await Card.find()
  res.render('card', { card, alert })
  alert.type = ''
  alert.message = ''
})

module.exports = router
