const { Schema, model } = require('mongoose')
const favouriteSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },

  title: {
    type: String,
    required: true, //позначаємо що це поле є обов'язковим
  },

  img: String,

  price: {
    type: Number,
    required: true,
  },

  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'User', //на модель користувача
    required: true,
  },

  userInSession: {
    type: Schema.Types.ObjectId,
    ref: 'User', //на модель користувача
    required: true,
  },
})

module.exports = model('Favourite', favouriteSchema)
