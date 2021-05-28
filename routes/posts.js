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

const { protect } = require("../middleware/auth");

router.use(protect);

router.route("/").get(getPosts).post(createPost);

router.route("/:id").get(getPost);

router.route("/:id/like").put(updateLike);

router.route("/:id/comment").post(addComment).get(getComments);
router.route("/:id/:commentId").put(updateComment).delete(deleteComment);

module.exports = router;
