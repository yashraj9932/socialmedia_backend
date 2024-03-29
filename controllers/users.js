const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const path = require("path");

// @desc      Follow A User
// @route     POST /users/:id/follow
// @access    Private
exports.followUser = asyncHandler(async (req, res, next) => {
  if (req.params.id === req.user.id) {
    return next(new ErrorResponse("User cannot follow itself", 400));
  }
  const flri = await User.findById(req.user.id);
  let f = -1;
  const flr = flri.following;
  for (let i = 0; i < flr.length; i++) {
    if (flr[i] == req.params.id) {
      f = i;
    }
  }
  let follower, followed;
  if (f == -1) {
    follower = await User.findByIdAndUpdate(
      req.user.id,
      {
        $push: { following: req.params.id },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    followed = await User.findByIdAndUpdate(
      req.params.id,
      {
        $push: { followers: req.user.id },
      },
      {
        new: true,
        runValidators: true,
      }
    );
  } else {
    follower = await User.findByIdAndUpdate(
      req.user.id,
      {
        $pull: { following: req.params.id },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    followed = await User.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { followers: req.user.id },
      },
      {
        new: true,
        runValidators: true,
      }
    );
  }
  res.status(200).json({ success: true, follower, followed });
});

// @desc      Get A User
// @route     Get /users/:id
// @access    Public
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate({
    path: "posts",
    select: "picture",
  });
  if (!user) {
    return next(new ErrorResponse("User Not Found", 404));
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Get Logged in User
// @route     Get /users/user/current
// @access    Public
exports.getLoggedUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate({
    path: "posts",
    select: "picture caption",
  });
  if (!user) {
    return next(new ErrorResponse("User Not Found", 404));
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Get A Users Followers
// @route     Get /users/:id/followers
// @access    Public
exports.getFollowers = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorResponse("User Not Found", 404));
  }

  res.status(200).json({
    success: true,
    data: user.followers,
  });
});

// @desc      Get A Users Following
// @route     Get /users/:id/following
// @access    Public
exports.getFollowing = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate({
    path: "following",
    populate: {
      path: "posts",
    },
  });
  // const user = await User.findById(req.params.id).populate("following");
  if (!user) {
    return next(new ErrorResponse("User Not Found", 404));
  }

  res.status(200).json({
    success: true,
    data: user.following,
  });
});

// @desc      Register a User
// @route     POST /users/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, phone, password } = req.body;

  const user = await User.create({ name, email, phone, password });
  sendTokenResponse(user, 200, res);
});

// @desc      Login a User
// @route     POST /users/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new ErrorResponse("Please provide both email and password", 404)
    );
  }
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorResponse("Invaid Credentials", 404));
  }
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid Credentials", 404));
  }
  sendTokenResponse(user, 200, res);
});

const sendTokenResponse = (user, statusCode, res) => {
  //   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
  //     expiresIn: process.env.JWT_EXPIRE,
  //   });

  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};

exports.updateBio = asyncHandler(async (req, res, next) => {
  if (!req.body.bio) {
    return next(new ErrorResponse("Please Enter A Bio", 404));
  }
  const fieldstoUpdate = {
    bio: req.body.bio,
  };

  const ress = await User.findByIdAndUpdate(req.user.id, fieldstoUpdate, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: ress });
});

exports.updateDP = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  if (!req.files) {
    return next(new ErrorResponse("Please upload a file", 400));
  }

  const file = req.files.file;

  // Make sure the image is a image in any format
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse("Please upload file in correct format", 400));
  }

  const datetime = Date.now();
  // Create custom filename
  file.name = `img_${req.user.id}${datetime}${path.parse(file.name).ext}`;
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse("Problem with file upload", 500));
    }

    req.body.picture = file.name;
    const fieldstoUpdate = {
      displayPic: req.body.picture,
    };
    const ress = await User.findByIdAndUpdate(req.user.id, fieldstoUpdate, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: ress });
  });
});

exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find().select("name");

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});
