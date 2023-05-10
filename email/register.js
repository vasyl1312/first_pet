module.exports = function (email, name) {
  return {
    sender: {
      email: process.env.EMAIL_FROM,
    },
    to: [
      {
        email,
      },
    ],
    subject: 'Account has been successfully created',
    textContent: `
        <!DOCTYPE html>
        <html>
          <head>
            <title>YOUR ACCOUNT IS NOW ACTIVE</title>
          </head>
          <body style="background-color: #cacaca; font-family: Arial, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <img src="https://i.ibb.co/j3BwtZN/calzone.png" alt="" style="display: block; max-width: 10%; height: auto; margin-bottom: 20px;">
              <p>Dear ${name}</p>
              <p>Thank you for registering on our website! We are glad to welcome you to our community and hope that our services will be useful for you.</p>
              <p>Don't forget to visit our website and see our latest news and opportunities.</p>
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
