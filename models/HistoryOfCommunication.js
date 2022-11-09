const { Schema, model } = require('mongoose')

const historySchema = new Schema({
  data: {
    type: Date,
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

module.exports = model('History', historySchema)
