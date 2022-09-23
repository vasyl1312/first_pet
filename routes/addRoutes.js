const { Router } = require('express')
const Product = require('../models/Product')
const User = require('../models/User')
const empty = require('../config/keys.json')
const router = new Router()

let alert = { type: '', message: '' }
router.get('/', (req, res) => {
  res.render('add', { alert })
  alert.type = ''
  alert.message = ''
})

router.post('/', async (req, res) => {
  try {
    let { title, price, img, description } = req.body
    if (title.length > 45) {
      alert.type = 'info'
      alert.message = 'Your name of the product is too long ( >45 symbols)'
      return res.redirect('/add')
    }

    function validURL(str) {
      var pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$',
        'i'
      ) // fragment locator
      return !!pattern.test(str)
    }

    if (validURL(img) == false) {
      img = empty.EmptyImg
    }

    const userId = await User.findById('631710599ef60667c848ba19')
    const product = new Product({
      title,
      price,
      img,
      description,
      userId,
    })

    await product.save()
    return res.redirect('/products')
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
