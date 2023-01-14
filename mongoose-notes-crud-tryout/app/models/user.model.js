const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
  {
    username: String,
    password: String,
    enabled: String,
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('User', UserSchema)
