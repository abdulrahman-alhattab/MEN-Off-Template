const mongoose = require('mongoose')
const userSchema = mongoose.Schema(
  {
    username: String,
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    phone: {
      type: Number,
      required: true
    },
    likesTrains: {
      type: Boolean
    }
  },
  {
    Timestamps: true
  }
)

const User = mongoose.model('User', userSchema)

module.exports = User
