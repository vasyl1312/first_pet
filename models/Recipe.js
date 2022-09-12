const { Schema, model } = require('mongoose')

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true, //позначаємо що це поле є обов'язковим
  },
  img: String,
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', //взаємодія між курсами та користувачем
  },
})

//щоб справити помилку-id при видаленні курсу
// recipeSchema.method('toClient', function () {
//   const recipe = this.toObject()
//   recipe.id = recipe._id
//   delete recipe._id
//   return recipe
// })

module.exports = model('Recipe', recipeSchema)
