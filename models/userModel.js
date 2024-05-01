const fire = require('../config/firestore')

const storeUser = async (userData) => {
  const usersCollection = fire.collection('users')
  const userSnapshot = await usersCollection
    .where('googleId', '==', userData.sub)
    .get()

  if (userSnapshot.empty) {
    // User doesn't exist, create a new document
    await usersCollection.add({
      googleId: userData.sub,
      email: userData.email,
      name: userData.name,
    })
  } else {
    // User exists. Here, you can update user data if necessary or just return
    return userSnapshot.docs[0].data()
  }
}

//This will get userdata by id doc and return userData without password
const getUserbyId = async (idUser) => {
  const userSnapshot = await fire.collection('users').doc(idUser).get()
  try {
    //check the user Data and return it if exist
    return userSnapshot.exists
      ? {
          id: userSnapshot.id,
          ...userSnapshot.data(),
          password: undefined,
        }
      : false
  } catch (error) {
    console.error('Error Get Document', error)
  }
}

//This will get userdata by Email of doc and return userData
const getUserbyEmail = async (email) => {
  const userSnapshot = await fire
    .collection('users')
    .where('email', '==', email)
    .where('isActive', '==', true)
    .get()

  try {
    if (userSnapshot.empty) return null // or return {};

    const data = userSnapshot.docs[0] // only retrieves the first listed data

    return {
      id: data.id,
      ...data.data(),
    }
  } catch (error) {
    console.error('Error Get Document', error)
  }
}

//add user data
const addUser = async (idUser, userData) => {
  try {
    return await fire.collection('users').doc(idUser).set(userData)
  } catch (error) {
    console.error('Error Add User', error)
  }
}

//update user data
const updateUser = async (idUser, userData) => {
  try {
    return await fire.collection('users').doc(idUser).update(userData)
  } catch (error) {
    console.error('Error Update User', error)
  }
}

module.exports = {
  storeUser,
  getUserbyEmail,
  getUserbyId,
  addUser,
  updateUser,
}
