module.exports = function (email, name) {
  return {
    to: email,
    from: process.env.EMAIL_FROM,
    subject: 'Account has been successfully created',
    html: `
      <h1>Welcome to Kepsko site</h1>
      <img src="https://cdn-icons-png.flaticon.com/512/4481/4481293.png" width="300"/>
      <p>You successfully created your account with email:<h6> ${email}</h6>and username:<h6> ${name}</h6></p>
      <img class="img-header" src="https://cdn-icons-png.flaticon.com/512/4799/4799167.png" width="200"/>
      <p>Go to website
        <a href="${process.env.BASE_URL_PORT}">Kepsko site</a>
      </p>  
      <hr />

      <p class="m-0 text-center text-white">
          If you have any questions to author, feel free:
          <a href="https://djinni.co/q/d9b5f577b1/" target="_blank">
            <img
              src="http://djinni.co/static/favicons/v03/favicon-196x196.png"
              alt="Djinni Badge"
              width="20"
            />
          </a>
          <a href="https://www.instagram.com/vasyllko/" target="_blank">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/768px-Instagram_logo_2016.svg.png"
              alt="Instagram Badge"
              width="20"
            />
          </a>
          <a href="https://t.me/vasylkoo" target="_blank">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png"
              alt="Telegram Badge"
              width="20"
            />
          </a>
          <a href="https://github.com/vasyl1312" target="_blank">
            <img
              src="https://play-lh.googleusercontent.com/PCpXdqvUWfCW1mXhH1Y_98yBpgsWxuTSTofy3NGMo9yBTATDyzVkqU580bfSln50bFU"
              alt="GitHub Badge"
              width="20"
            />
          </a>
        </p>
    `,
  }
}
