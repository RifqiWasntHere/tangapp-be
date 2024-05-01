exports.googleAuthCallback = async (req, res, next) => {
  try {
    const { user } = req
    // User exists -> generate token and send it away
    // User !exists -> send user's credentials for registration purpose
    if (existingUser) {
      const token = await addJwtUser({
        userId: existingUser.id,
        email: existingUser.email,
      })

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
