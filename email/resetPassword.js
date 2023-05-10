module.exports = function (email, token) {
  return {
    sender: {
      email: process.env.EMAIL_FROM,
    },
    to: [
      {
        email,
      },
    ],
    subject: 'Reset password',
    textContent: `
        <!DOCTYPE html>
        <html>
          <body style="background-color: #cacaca; font-family: Arial, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <img src="https://i.ibb.co/j3BwtZN/calzone.png" alt="" style="display: block; max-width: 10%; height: auto; margin-bottom: 20px;">
              <p>Forgot your password?</p>
              <p>Do you want to reset your password to account with email: ${email}?</p>
              <p>If not - just ignore this message</p>
              <p>Otherwise:</p>
              <div style="text-align: center; margin-top: 30px;">
              <a href="${process.env.BASE_URL_PORT}/login/reset/password/${token}" style="background-color: #08162d; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset password</a>
              </div>
              <hr />
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
