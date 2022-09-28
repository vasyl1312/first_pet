//якщо користувач зареєстрований то доступні роути, як ні то редірект
module.exports = function (req, res, next) {
  if (!req.session.isAuthenticated) {
    return res.redirect('/login')
  }
  next()
}
