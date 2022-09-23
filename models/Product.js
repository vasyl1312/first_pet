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
    ref: 'User', //взаємодія між продуктом та користувачем
  },
})

module.exports = model('Product', productSchema)
