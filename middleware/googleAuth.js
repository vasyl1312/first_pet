var GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/User')
<<<<<<< HEAD
const Sib = require('sib-api-v3-sdk')
const regMail = require('../email/register')
const emptyAvatar = '/images/emptyAvatar.png'
=======
const sgMail = require('@sendgrid/mail')
// const keys = require('../config/keys.json')
const regMail = require('../email/register')
const emptyAvatar = '/images/emptyAvatar.png'
// const CLIENT_ID = require('../config/keys.json').CLIENT_ID
// const CLIENT_SECRET = require('../config/keys.json').CLIENT_SECRET
>>>>>>> main

module.exports = async function (passport) {
  try {
    passport.use(
      new GoogleStrategy(
        {
<<<<<<< HEAD
          clientID: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          callbackURL: `/google/callback`, //прихостингу є помилки
          // callbackURL: `${process.env.BASE_URL_PORT}/google/callback`,
=======
          clientID: `${process.env.CLIENT_ID}`,
          clientSecret: `${process.env.CLIENT_SECRET}`,
          callbackURL: `${process.env.BASE_URL_PORT}/google/callback`,
>>>>>>> main
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

<<<<<<< HEAD
              Sib.ApiClient.instance.authentications['api-key'].apiKey = process.env.API_KEY_BLUE
=======
              //транспортер для відправлення по апі ключу сенд гріда емейл
              sgMail.setApiKey(process.env.API_KEY)
>>>>>>> main
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
