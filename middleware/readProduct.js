const Product = require('../models/Product')
const User = require('../models/User')

module.exports = async function (req, res) {
  try {
    let base_url = process.env.BASE_URL_PORT
    const product = await Product.findById(req.params.id)
    let img = product.img
    if (img != '/images/empty.png') {
      img = '/' + img
    }

    //щоб не авторизовані могли читати а інші додавати до улюблених
    if (req.session.isAuthenticated) {
      const userInSession = await User.findById(req.user._id)
      res.render('product', { product, userInSession, img, base_url })
    } else res.render('product', { product, img, base_url })
  } catch (e) {
    console.log(e)
  }
}
