const { Router } = require('express')
const isAuth = require('../middleware/isAuth')
const sgMail = require('@sendgrid/mail')
const contactPerson = require('../email/contactPerson')
const keys = require('../config/keys.json')
const User = require('../models/User')
const router = new Router()

let alert = { type: '', message: '' }
router.get('/', isAuth, (req, res) => {
  try {
    res.render('history', { alert })
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
      // .send(contactPerson(req.session.user, req.body, req.session.user.email))
      .send(
        contactPerson(req.session.user.email, req.body.title, req.body.img, owner.name, owner.email)
      )
      .catch((error) => {
        console.error(error)
      })

    res.render('history', { alert })
  } catch (e) {
    console.log(e)
  }
})
module.exports = router
