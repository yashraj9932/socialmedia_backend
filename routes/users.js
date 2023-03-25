const express = require('express')

const {
  login,
  register,
  getUser,
  getFollowers,
  getFollowing,
  followUser,
  updateBio,
  getLoggedUser,
  getAllUsers
} = require('../controllers/users')

const { protect, authorize } = require('../middleware/auth')

const router = express.Router()

const postRouter = require('./posts')

router.use('/:id/posts', postRouter)

router.route('/login').post(login)
router.route('/register').post(register)

router.use(protect)

router.route('/').get(getAllUsers)

router.route('/:id/follow').post(followUser)

router.route('/:id').get(getUser)
router.route('/user/current').get(getLoggedUser)

router.route('/:id/followers').get(getFollowers)
router.route('/:id/following').get(getFollowing)

router.route('/update/bio').put(updateBio)

module.exports = router
