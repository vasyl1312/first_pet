const { Schema, model } = require('mongoose')
const orderSchema = new Schema({
  //в моделі прописуємо які продукти хочемо купити і користувача який купляє i дату
  products: [
    {
      products: {
        type: Object,
        required: true,
      },
    },
  ],
  user: {
    name: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', //на модель користувача
      required: true,
    },
  },
  // data: {
  //   type: Date,
  //   default: Date.now(),
  // },
})

module.exports = model('Order', orderSchema)
