const { Router } = require('express')
const Recipe = require('../models/Recipe')
const router = new Router()

router.get('/', (req, res) => {
  res.render('add')
})

router.post('/', async (req, res) => {
  try {
    const { title, img, description, userId } = req.body

    const recipe = new Recipe({
      title,
      img,
      description,
      userId,
    })
    await recipe.save()
    res.render('recipies')
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
