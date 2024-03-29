const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  name: String,
  email: { type: String, required: true },
  password: { type: String },
  resetToken: String,
  resetTokenExp: Date,
  avatarUrl: String,
  favourite: [],
  products: [],
  history: [],
})

//метод для чищення кошику піля замовлення
userSchema.methods.clearfavourite = function () {
  this.favourite = { favourite: [] }
  return this.save()
}

module.exports = model('User', userSchema)
