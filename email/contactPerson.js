const User = require('../models/User')
const Product = require('../models/Product')

module.exports = function (emailInSession, productTitle, productImg, ownerName, ownerEmail) {
  return {
    to: ownerEmail,
    from: process.env.EMAIL_FROM,
    subject: `Hello, Your portfolio is interesting to me)`,
    html: `
            <h1>Hi, ${ownerName}</h1> <h2>My email is: ${emailInSession}:</h2>
            <p>Your portfolio: <h5>${productTitle}</h5></p>
            <p>is so interesting for me,
             We can communicate about studying or other here</p>
             <h3>
               Please, let me know if you got this letter.</p>
             </h3>
             <img class="img-header" src="https://cdn-icons-png.flaticon.com/512/4799/4799167.png" width="200"/>
             <p>Go to website
               <a href="${process.env.BASE_URL_PORT}">Kepsko site</a>
             </p>
             <hr />
           `,
  }
}
