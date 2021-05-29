const express = require("express");

const {
  login,
  register,
  getUser,
  getFollowers,
  getFollowing,
  followUser,
} = require("../controllers/users");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

const postRouter = require("./posts");

router.use("/:id/posts", postRouter);

router.route("/login").post(login);
router.route("/register").post(register);

router.use(protect);

router.route("/:id/follow").post(followUser);

router.route("/:id").get(authorize, getUser);

router.route("/:id/followers").get(authorize, getFollowers);
router.route("/:id/following").get(authorize, getFollowing);

module.exports = router;
