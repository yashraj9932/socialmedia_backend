const asyncHandler = require("../middleware/async");
const Post = require("../models/Post");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

exports.getPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find({ user: req.params.id });

  res.status(200).json({ success: true, count: posts.length, data: posts });
});

exports.createPost = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  const post = await Post.create(req.body);
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      $push: { posts: post._id },
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    success: true,
    data: post,
  });
});

exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorResponse("Post Doesnt exist", 404));
  }

  res.status(200).json({ success: true, data: post });
});

exports.updateLike = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorResponse("Post Doesnt exist", 404));
  }

  const lpost = post.likes;
  var i,
    f = -1;
  for (i = 0; i < lpost.length; i++) {
    if (lpost[i].likedBy == req.user.id) {
      f = i;
    }
  }
  const fieldstoUpdate = {};
  let ress;
  if (f == -1) {
    fieldstoUpdate.likedBy = req.user.id;
    fieldstoUpdate.value = 1;
    ress = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: { likes: fieldstoUpdate },
      },
      {
        new: true,
        runValidators: true,
      }
    );
  } else {
    fieldstoUpdate.likedBy = req.user.id;
    fieldstoUpdate.value = 1;
    ress = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likes: fieldstoUpdate },
      },
      {
        new: true,
        runValidators: true,
      }
    );
  }
  res.status(200).json({ success: true, data: ress });
});

exports.addComment = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorResponse("Post Does'nt exist", 404));
    const fieldstoUpdate = {};
  }
  if (!req.body.text) {
    return next(new ErrorResponse("Post Does'nt exist", 404));
  }
  let ress;
  const fieldstoUpdate = {};

  fieldstoUpdate.commentBy = req.user.id;
  fieldstoUpdate.text = req.body.text;
  ress = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $push: { comments: fieldstoUpdate },
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({ success: true, data: ress });
});

exports.getComments = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new ErrorResponse("Post Doesnt exist", 404));
  }
  res
    .status(200)
    .json({ success: true, count: post.comments.length, data: post.comments });
});

exports.updateComment = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorResponse("Post Doesnt exist", 404));
  }

  if (!req.body.text) {
    return next(new ErrorResponse("Post Does'nt exist", 404));
  }
  const ress = await Post.findOneAndUpdate(
    { "comments._id": req.params.commentId },
    {
      $set: {
        "comments.$.text": req.body.text,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (ress === null) {
    return next(new ErrorResponse("Comment does not exist", 404));
  }

  res.status(200).json({ success: true, data: ress });
});

exports.deleteComment = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorResponse("Post Doesnt exist", 404));
  }

  const commentt = {
    text: req.body.text,
    commentBy: req.user.id,
  };
  const ress = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $pull: {
        comments: {
          _id: req.params.commentId,
        },
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: ress,
  });
});
