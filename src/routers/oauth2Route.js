const express = require('express')
const passport = require('passport')
const { googleAuthCallback } = require('../controllers/oauth2Controller')

const router = express.Router()

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/google/failure',
    session: false,
  }),
  googleAuthCallback
)

router.get('/google/failure', (req, res) =>
  res.status(401).send('Failed to login with Google.')
)

module.exports = router
