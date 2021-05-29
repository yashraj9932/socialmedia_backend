const express = require("express");

const {
  getPosts,
  createPost,
  getPost,
  updateLike,
  addComment,
  updateComment,
  deleteComment,
  getComments,
} = require("../controllers/posts");

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../middleware/auth");

const { authorizePost } = require("../middleware/authPost");

router.use(protect);

router.route("/").get(authorize, getPosts).post(createPost);

// router.use(authorizePost);

router.route("/:id").get(authorizePost, getPost);

router.route("/:id/like").put(updateLike);

router.route("/:id/comment").post(addComment).get(getComments);
router.route("/:id/:commentId").put(updateComment).delete(deleteComment);

module.exports = router;
