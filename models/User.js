const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Add A Name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  phone: {
    type: String,
    maxlength: [20, 'Phone number can not be longer than 20 characters']
  },
  posts: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Post',
    required: true
  },
  following: {
    type: [mongoose.Schema.ObjectId],
    ref: 'User'
  },
  followers: {
    type: [mongoose.Schema.ObjectId],
    ref: 'User'
  },
  displayPic: {
    type: String
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6
  },
  private: {
    type: String,
    enum: ['Private', 'Public'],
    default: 'Private'
  },
  bio: {
    type: String,
    default: ''
  }
})

// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })
}

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', UserSchema)
