var GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/User')
const Sib = require('sib-api-v3-sdk')
const regMail = require('../email/register')
const emptyAvatar = '/images/emptyAvatar.png'

module.exports = async function (passport) {
  try {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          callbackURL: `/google/callback`,
          // callbackURL: `${process.env.BASE_URL_PORT}/google/callback`,
        },
        async function (accessToken, refreshToken, profile, done) {
          // find if a user exist with this email or not
          await User.findOne({ email: profile.emails[0].value }).then(async (data) => {
            if (data) {
              return done(null, data)
            } else {
              const user = new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: null,
                /////////////////зробити шось з тим нулем
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
