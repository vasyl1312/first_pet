const { Router } = require('express')
var fs = require('fs')
const User = require('../models/User')
const isAuth = require('../middleware/isAuth') //якщо користувач зареєстрований то доступні роути
const router = Router()

router.get('/', isAuth, async (req, res) => {
  res.render('profile', {
    user: req.user.toObject(),
  })
})

router.post('/', isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id) //берем користувача якого хочемо змінити
    const toChange = {
      name: req.body.name,
    }

    if (req.file) {
      if (user.avatarUrl != '/images/emptyAvatar.png') {
        var filePath = `./${req.body.img}` //видаляєм старе фото з бази
        fs.unlinkSync(filePath)
      }
      toChange.avatarUrl = req.file.path
    }

    Object.assign(user, toChange)
    await user.save()
    res.redirect('/profile')
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
