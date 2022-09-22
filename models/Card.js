const { Schema, model } = require('mongoose')
const cardSchema = new Schema({
  //в моделі прописуємо які курси хочемо купити і користувача який купляє i дату
  products: {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product', //на модель користувача
      // required: true,
    },
    title: {
      type: String,
      // required: true, //позначаємо що це поле є обов'язковим
    },
    img: String,
    price: {
      type: Number,
      // required: true,
    },
    // user: {
    //   name: String,
    //   userId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User', //на модель користувача
    //     required: true,
    //   },
    // },
    // date: {
    //   type: Date,
    //   default: Date.now(),
    // },
  },
})

module.exports = model('Card', cardSchema)
