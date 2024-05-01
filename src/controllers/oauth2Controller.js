const { getUserbyEmail, addUser } = require('../models/userModel')
const generateId = require('../security/generateId')

exports.googleAuthCallback = async (req, res, next) => {
  const userId = generateId()
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
    console.log(user)
    // User exists -> generate token and send it away (to-do: JWT)
    // User !exists -> send user's credentials & add to db
    if (existingUser) {
      const token = {
        userId: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
      }

      return res.json({ token })
    } else {
      const userDetails = {
        name: user.displayName,
        email: user.emails[0].value,
        isActive: true,
      }
      await addUser(userId, userDetails)
      return res.status(201).json({ userDetails })
    }
  } catch (error) {
    return next(error)
  }
}
