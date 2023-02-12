var GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/User')
const sgMail = require('@sendgrid/mail')
const keys = require('../config/keysSecures.json')
const regMail = require('../email/register')
const emptyAvatar = '/images/emptyAvatar.png'
const clientId = require('../config/googleDatas').clientId
const clientSecreT = require('../config/googleDatas').clientSecret

module.exports = async function (passport) {
  try {
    passport.use(
      new GoogleStrategy(
        {
          clientID: clientId,
          clientSecret: clientSecreT,
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

              sgMail.setApiKey(keys.API_KEY) //транспортер для відправлення по апі ключу сенд гріда емейл
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
