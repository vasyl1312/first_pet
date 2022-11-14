const { Router } = require('express')
const isAuth = require('../middleware/isAuth')
const sgMail = require('@sendgrid/mail')
const contactPerson = require('../email/contactPerson')
const History = require('../models/HistoryOfCommunication')
const Product = require('../models/Product')
const keys = require('../config/keys.json')
const User = require('../models/User')
const router = new Router()

let alert = { type: '', message: '' }
router.get('/', isAuth, async (req, res) => {
  try {
    const userInSession = await User.findById(req.user._id)
    const history = await History.find({ userInSession: userInSession._id })
    res.render('history', { alert, userInSession, history })
    alert.type = ''
    alert.message = ''
  } catch (e) {
    console.log(e)
  }
})

router.post('/', isAuth, async (req, res) => {
  try {
    alert.type = 'success'
    alert.message = 'You successfully sent mail to this person'
    const owner = await User.findById({ _id: req.body.ownerId })
    sgMail.setApiKey(keys.API_KEY) //і відсилаємо на email лист від користувача в сесії
    await sgMail
      .send(
        contactPerson(req.session.user.email, req.body.title, req.body.img, owner.name, owner.email)
      )
      .catch((error) => {
        console.error(error)
      })
    //console.log(req.body)
    let { title, img, price, userId, userInSession } = req.body
    const history = new History({
      data: new Date().toLocaleString().replace(',', ''),
      productTitle: title,
      productPrice: price,
      ownerName: owner.name,
      ownerEmail: owner.email,
      ownerId: owner.id,
      userInSession,
    })

    await history.save()
    res.redirect('/history')
    // res.render('history', { alert, favourite })
  } catch (e) {
    console.log(e)
  }
})
module.exports = router
