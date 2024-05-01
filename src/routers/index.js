const express = require('express')
const router = express.Router()

const oauth2Route = require('./oauth2Route')
router.use('/auth', oauth2Route)

module.exports = router
