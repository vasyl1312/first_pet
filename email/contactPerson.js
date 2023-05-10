module.exports = function (emailInSession, productTitle, ownerName, ownerEmail) {
  return {
    sender: {
      email: process.env.EMAIL_FROM,
    },
    to: [
      {
        email: ownerEmail,
      },
    ],
    subject: `Hello, Your portfolio is interesting to me)`,
    textContent: `
        <!DOCTYPE html>
        <html>
          <body style="background-color: #cacaca; font-family: Arial, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <img src="https://i.ibb.co/j3BwtZN/calzone.png" alt="" style="display: block; max-width: 10%; height: auto; margin-bottom: 20px;">
              <p>Hi, ${ownerName}, my email is: ${emailInSession}</p>
              <p>Your portfolio: <b style="color: #f28123">
              
              ${productTitle}
              </b>
               is so interesting for me,
              We can communicate about studying or other here</p>
              <p>Please, let me know if you got this letter.</p>
              <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.BASE_URL_PORT}" style="background-color: #f28123; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Go to website</a>
              </div>
              <p>Yours sincerely, <b>Kepsko Team</b></p>
            </div>
          </body>
        </html>
           `,
  }
}
