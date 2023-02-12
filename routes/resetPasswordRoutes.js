const { Router } = require('express')
const crypto = require('crypto') //для рандом знач для коду
const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')
const sgMail = require('@sendgrid/mail')
const User = require('../models/User')
const keys = require('../config/keysSecures.json')
const resetPassword = require('../email/resetPassword')
const { log } = require('console')
const router = new Router()

let alert = { type: '', message: '' }
router.get('/', (req, res) => {
  res.render('reset', { alert })
  alert.type = ''
  alert.message = ''
})

router.post('/', (req, res) => {
  try {
    //для самого скидання паролю(генеруємо рандом ключ і відправляємо на пошту користувачу, якщо він за певний час перейде по посиланню (токен перевіряється автоматично на час життя і чи email) то можна ввести новий пароль)
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

        sgMail.setApiKey(keys.API_KEY) //і відсилаємо йому на email лист
        await sgMail.send(resetPassword(candidate.email, token)).catch((error) => {
          console.error(error)
        })

        alert.type = 'success'
        alert.message = 'Please, check your email'
        return res.redirect('/login/reset')
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

router.get('/password/:token', async (req, res) => {
  if (!req.params.token) {
    return res.redirect('/login')
  }

  try {
    const user = await User.findOne({
      resetToken: req.params.token,
      resetTokenExp: { $gt: Date.now() }, //перевірка чи час життя токена не сплинув
    }) //шукаємо користувача з таким токеном

    if (!user) {
      //якщо користувача не знайдено з токеном або час сплинув то все
      return res.redirect('/login')
    } else {
      res.render('password', {
        alert,
        userId: user._id.toString(),
        token: req.params.token,
      })
    }
  } catch (e) {
    console.log(e)
  }
})

router.post('/password', async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.body.userId,
      resetToken: req.body.token,
      resetTokenExp: { $gt: Date.now() },
    }) //перевірка користувача та токена

    if (user) {
      user.password = await bcrypt.hash(req.body.password, 10) //якщо користувача знайдено то міняємо пароль
      user.resetToken = undefined //видаляємо всі дані токена відновлення
      user.resetTokenExp = undefined
      await user.save()

      //add msg, that we have success
      return res.redirect('/login')
    } else {
      return res.redirect('/login')
    }
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
