const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  name: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  resetToken: String,
  resetTokenExp: Date,
  cart: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    },
  ],
})

//метод для чищення кошику піля замовлення
userSchema.methods.clearCart = function () {
  this.cart = { items: [] }
  return this.save()
}

module.exports = model('User', userSchema)
