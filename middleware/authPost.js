const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const Post = require("../models/Post");

exports.authorizePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new ErrorResponse("Requested Post does not exist", 404));
  }
  const user = await User.findById(post.user);

  if (user.private !== "public") {
    if (
      req.user.following.indexOf(user._id) == -1 &&
      req.user.id !== user._id.toString()
    ) {
      return next(
        new ErrorResponse(`${req.user.id} does not follow ${user._id}`, 400)
      );
    }
  }
  next();
});
