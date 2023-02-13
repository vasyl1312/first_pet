var GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/User')
const sgMail = require('@sendgrid/mail')
// const keys = require('../config/keys.json')
const regMail = require('../email/register')
const emptyAvatar = '/images/emptyAvatar.png'
// const CLIENT_ID = require('../config/keys.json').CLIENT_ID
// const CLIENT_SECRET = require('../config/keys.json').CLIENT_SECRET

module.exports = async function (passport) {
  try {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          callbackURL: 'http://localhost:3000/google/callback',
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
                /////////////////зробити шось з тим нудем
                avatarUrl: emptyAvatar,
              })

              //транспортер для відправлення по апі ключу сенд гріда емейл
              sgMail.setApiKey(process.env.API_KEY)
              await user.save()
              await User.findOne({ email: profile.emails[0].value }).then(async (data) => {
                await sgMail
                  .send(regMail(profile.emails[0].value, profile.displayName))
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
