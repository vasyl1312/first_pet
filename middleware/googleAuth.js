var GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const Sib = require('sib-api-v3-sdk')
const regMail = require('../email/register')
const emptyAvatar = '/images/emptyAvatar.png'

function generatePassword() {
  var length = 8,
    charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    retVal = ''
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n))
  }
  return retVal
}

module.exports = async function (passport) {
  try {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          // callbackURL: `/google/callback`, //прихостингу є помилки
          callbackURL: `${process.env.BASE_URL_PORT}/google/callback`,
        },
        async function (accessToken, refreshToken, profile, done) {
          // find if a user exist with this email or not
          await User.findOne({ email: profile.emails[0].value }).then(async (data) => {
            if (data) {
              return done(null, data)
            } else {
              const hashPassword = await bcrypt.hash(generatePassword(), 10)
              const user = new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: hashPassword, //додаємо рандомний пароль
                avatarUrl: emptyAvatar,
              })

              Sib.ApiClient.instance.authentications['api-key'].apiKey = process.env.API_KEY_BLUE
              await user.save()
              await User.findOne({ email: profile.emails[0].value }).then(async (data) => {
                const tranEmailApi = new Sib.TransactionalEmailsApi()
                await tranEmailApi
                  .sendTransacEmail(regMail(profile.emails[0].value, profile.displayName))
                  .catch((error) => {
                    console.error(error)
                  })

                return done(null, data)
              })
            }
          })
        }
      )
    )

    passport.serializeUser(function (user, done) {
      done(null, user.id)
    })

    passport.deserializeUser(function (id, done) {
      User.findById(id, function (err, user) {
        done(err, user)
      })
    })
  } catch (e) {
    console.log(e)
  }
}
