const keys = require('../config/keys.json')

module.exports = function (email) {
  return {
    to: email,
    from: keys.EMAIL_FROM,
    subject: 'Account has been successfully created',
    html: `
      <h1>Welcome to Keps'ko site</h1>
      <p>You successfully created the account with email - ${email}</p>
      <hr />
      <a href="${keys.BASE_URL_PORT}">Go to website</a>
    `,
  }
}
