const { Schema, model } = require('mongoose')
const cardSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },

  title: {
    type: String,
    required: true, //позначаємо що це поле є обов'язковим
  },

  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'User', //на модель користувача
    required: true,
  },
})

module.exports = model('Card', cardSchema)
