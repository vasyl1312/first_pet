const { Schema, model } = require('mongoose')
const cardSchema = new Schema({
  //в моделі прописуємо які курси хочемо купити і користувача який купляє i дату
  products: [
    {
      product: {
        type: Object,
        required: true,
      },
    },
  ],
  // user: {
  //   name: String,
  //   userId: {
  //     type: Schema.Types.ObjectId,
  //     ref: 'User', //на модель користувача
  //     required: true,
  //   },
  // },
  // data: {
  //   type: Date,
  //   default: Date.now(),
  // },
})

module.exports = model('Card', cardSchema)
