const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  likes: [
    {
      likedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
      },
      value: {
        type: String,
        enum: ['0', '1'],
        default: '0'
      }
    }
  ],
  comments: [
    {
      commentBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
      },
      text: {
        type: String
      }
    }
  ],
  picture: {
    type: String,
    required: [true, 'Please Add a Picture']
  },
  caption: {
    type: String,
    default: ''
  }
})

module.exports = mongoose.model('Post', PostSchema)
