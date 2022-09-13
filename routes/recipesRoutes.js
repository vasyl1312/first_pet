const { Router } = require('express')
const Recipe = require('../models/Recipe')
const router = Router()

router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find()
    res.render('recipes', {
      recipes: recipes,
    })
  } catch (e) {
    console.error(e)
  }
})

module.exports = router
