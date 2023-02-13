// const keys = require('../config/keys.json')

module.exports = function (email, token) {
  return {
    to: email,
    from: process.env.EMAIL_FROM,
    subject: 'Reset password',
    html: `
    <h1>Forgot your password?</h1>
      <img src="https://cdn-icons-png.flaticon.com/512/4481/4481232.png" width="300"/>

      <p>Do you want to reset your password to account with email:<h6> ${email}?</h6></p>
      <p>If not - just ignore this message</p>
      <p>Otherwise:
        <a href="${process.env.BASE_URL_PORT}/login/reset/password/${token}">Reset password</a>    
      </p>
      <hr />
      <img class="img-header" src="https://cdn-icons-png.flaticon.com/512/4799/4799167.png" width="200"/>
      <p>Go to website
        <a href="${process.env.BASE_URL_PORT}">Kepsko site</a>
      </p> 
    `,
  }
}
