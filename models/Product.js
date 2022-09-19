const { Schema, model } = require('mongoose')

const productSchema = new Schema({
  title: {
    type: String,
    required: true, //позначаємо що це поле є обов'язковим
  },
  img: String,
  price: {
    type: Number,
    required: true,
  },
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
// productSchema.method('toClient', function () {
//   const recipe = this.toObject()
//   recipe.id = recipe._id
//   delete recipe._id
//   return recipe
// })

module.exports = model('Product', productSchema)
