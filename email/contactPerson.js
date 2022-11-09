const keys = require('../config/keys.json')
const User = require('../models/User')
const Product = require('../models/Product')

<<<<<<< HEAD
=======
// module.exports = async function (userInSession, productFromFav, fromEmail) {
//   try {
//     const owner = await User.findById({ _id: productFromFav.ownerId })
//     // const product = await Product.findById({ _id: productFromFav.productId })
//     console.log(owner.email, product)
//     return {
//       to: owner.email,
//       from: keys.EMAIL_FROM,
//       subject: `Hello, Your portfolio is interesting to me)`,
//       html: `
//           <h1>Hi, ${owner.name}, I am ${userInSession.name}:</h1>
//           <img src="${userInSession.avatarUrl}" width="300"/>

//           is so interesting for me,
//           We can communicate about studying or other</p>
//           <img class="img-header" src="https://cdn-icons-png.flaticon.com/512/4799/4799167.png" width="200"/>
//           <p>Go to website
//             <a href="${keys.BASE_URL_PORT}">Keps'ko site</a>
//           </p>
//           <hr />
//         `,
//     }
//   } catch (e) {
//     console.log(e)
//   }
// }

{
  /* <p>Your portfolio: <h5>${product.title}</h5></p>
           <img src="${product.img}" width="500"/>
          <p>and expected salary:<h6> ${product.price}</h6> */
}

>>>>>>> 6ba1252c7040d771c70b91db7fa01546eb11d3ce
module.exports = function (emailInSession, productTitle, productImg, ownerName, ownerEmail) {
  return {
    to: ownerEmail,
    from: keys.EMAIL_FROM,
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
               <a href="${keys.BASE_URL_PORT}">Keps'ko site</a>
             </p>
             <hr />
           `,
  }
}
