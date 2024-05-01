const { nanoid } = require('nanoid')

const generateId = (length = 15) => {
  return nanoid(length)
}

module.exports = generateId
