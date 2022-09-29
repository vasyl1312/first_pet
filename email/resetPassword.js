const keys = require('../config/keys.json')

module.exports = function (email, token) {
  return {
    to: email,
    from: keys.EMAIL_FROM,
    subject: 'Reset password',
    html: `
    <h1>Forgot your password?</h1>
      <img src="https://cdn-icons-png.flaticon.com/512/4481/4481232.png" width="300"/>

      <p>Do you want to reset your password to account with email:<h6> ${email}</h6></p>
      <p>If not - just ignore this message</p>
      <p>Otherwise:
        <a href="${keys.BASE_URL}/login/password/${token}">Reset password</a>    
      </p>
      <hr />
      <p>Go to website
        <img class="img-header" src="https://cdn-icons-png.flaticon.com/512/4799/4799167.png" width="20"/>
        <a href="${keys.BASE_URL_PORT}">Keps'ko site</a>
      </p> 
    `,
  }
}
