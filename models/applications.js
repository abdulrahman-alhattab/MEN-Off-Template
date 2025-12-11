const mongoose = require('mongoose')
const appSchema = new mongoose.Schema(
  {
    cars: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    damaged: {
      type: Boolean,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  },
  { timestamps: true }
)
const Applications = mongoose.model('applications', appSchema)

module.exports = Applications
