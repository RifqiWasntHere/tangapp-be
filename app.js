const express = require('express')
const passport = require('passport')
const router = require('./src/routers/index.js')

require('dotenv').config()
require('./src/config/oauth2.js')

const app = express()

app.use(passport.initialize())
app.use(router)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.listen(process.env.PORT, () => {
  console.log('server has started on port ' + process.env.PORT)
})
