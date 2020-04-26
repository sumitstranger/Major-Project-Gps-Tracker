const monk = require('monk')
const db = monk(process.env.DATABASE_URI)

module.exports = db