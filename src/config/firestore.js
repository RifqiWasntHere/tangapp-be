const admin = require('firebase-admin')
require('dotenv').config()

const fsCreds = JSON.parse(process.env.FIRESTORE_CREDS)

admin.initializeApp({
  credential: admin.credential.cert(fsCreds),
})

const fire = admin.firestore()

module.exports = fire
