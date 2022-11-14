const { Schema, model } = require('mongoose')

const historySchema = new Schema({
  data: {
    type: String,
    required: true,
  },

  productTitle: {
    type: String,
    required: true, //позначаємо що це поле є обов'язковим
  },

  productPrice: {
    type: String,
    required: true,
  },

  ownerName: {
    type: String,
    required: true,
  },

  ownerEmail: {
    type: String,
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

module.exports = model('History', historySchema)
