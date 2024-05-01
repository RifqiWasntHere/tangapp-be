const { getUserbyEmail } = require('../../models/userModel')

exports.googleAuthCallback = async (req, res, next) => {
  try {
    const { user } = req

    const existingUser = await getUserbyEmail(user.emails[0].value).catch(
      (error) => {
        console.error('Error fetching user by email', error)
        return res
          .status(500)
          .send('Internal Server Error while fetching user by email')
      }
    )

    // User exists -> generate token and send it away
    // User !exists -> send user's credentials for registration purpose
    if (existingUser) {
      const token = {
        userId: existingUser.id,
        email: existingUser.email,
      }

      return res.json({ token })
    } else {
      const userDetails = {
        name: user.displayName,
        email: user.emails[0].value,
      }
      return res.status(201).json({ userDetails })
    }
  } catch (error) {
    return next(error)
  }
}
