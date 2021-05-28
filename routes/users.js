const express = require("express");

const {
  login,
  register,
  getUser,
  getFollowers,
  getFollowing,
  followUser,
} = require("../controllers/users");

const { protect } = require("../middleware/auth");

const router = express.Router();

const postRouter = require("./posts");

router.use("/:userId/posts", postRouter);

router.route("/login").post(login);
router.route("/register").post(register);

router.route("/:id").get(getUser);

router.route("/:id/followers").get(getFollowers);
router.route("/:id/follow").post(protect, followUser);
router.route("/:id/following").get(getFollowing);

module.exports = router;
