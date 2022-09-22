const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  name: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
})

//розширюємо схему одразу тут щоб додти товар в кошик, func а не стрілкова бо треба this
userSchema.methods.addToCart = function (product) {
  const items = [...this.cart.items] //щоб в нас назви не повтор ми розвертаємо масив і записуєм копію
  //треба знайти id масиву з яким працюємо
  const idx = items.findIndex((c) => {
    return c.productId.toString() === product._id.toString() //переводимо об'єкти в string
  })
  //якщо курс є то ++ к-ть
  if (idx >= 0) {
    items[idx].count++
  } else {
    //додаємо елем в кошик якщо його там нема
    items.push({
      productId: product._id,
      count: 1,
    })
  }

  this.cart = { items }
  return this.save()
}

module.exports = model('User', userSchema)
