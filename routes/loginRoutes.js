const { Router } = require('express')
const bcrypt = require('bcryptjs')
const sgMail = require('@sendgrid/mail')
const crypto = require('crypto') //для рандом знач для коду
const User = require('../models/User')
const resetPassword = require('../email/resetPassword')
const router = new Router()

let alert = { type: '', message: '' }
router.get('/', (req, res) => {
  res.render('login', { alert, isLogin: true })
  alert.type = ''
  alert.message = ''
})

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body
    const candidate = await User.findOne({ email }) //перевірка чи існує користувач з таким email
    if (!candidate) {
      alert.type = 'warning'
      alert.message = 'This email is not exists, please try again'
      return res.redirect('/login')
    } else {
      const areSame = await bcrypt.compare(password, candidate.password) //перевірка і розхеш пароль
      if (!areSame) {
        alert.type = 'danger'
        alert.message = 'This password is incorrect'
        return res.redirect('/login')
      }

      req.session.user = candidate //додаємо користувача якщо все ок
      req.session.isAuthenticated = true // для того щоб деякі могли міняти контент а деякі не мають дозволу
      await req.session.save((err) => {
        if (err) {
          console.log(err)
          throw err
        }
      })
      res.redirect('/')
    }
  } catch (e) {
    console.log(e)
  }
})

router.get('/reset', (req, res) => {
  res.render('reset', { alert })
  alert.type = ''
  alert.message = ''
})

router.post('/reset', (req, res) => {
  try {
    //для самого скидання паролю(генеруємо рандом ключ і відправляємо на пошту користувачу, якщо він за певний час перейде по посиланню і введе той код то можна ввести новий пароль)
    crypto.randomBytes(32, async (err, buffer) => {
      if (err) {
        alert.type = 'danger'
        alert.message = 'Something get wrong, please try again later'
        return res.redirect('/login/reset')
      }

      const token = buffer.toString('hex')
      const candidate = await User.findOne({ email: req.body.email }) //перевіряємо чи введений емейл є в базі

      if (candidate) {
        candidate.resetToken = token
        candidate.resetTokenExp = Date.now() + 60 * 60 * 1000 //1год буде жити токен
        await candidate.save()
        //і відсилаємо йому на email лист
        await sgMail.send(resetPassword(candidate.email, token)).catch((error) => {
          console.error(error)
        })
        res.redirect('/login')
      } else {
        alert.type = 'warning'
        alert.message = 'This email doesn`t have an account, please try again'
        res.redirect('/login/reset')
      }
    })
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
