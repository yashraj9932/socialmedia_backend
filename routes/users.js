const express = require("express");

const { login, register } = require("../controllers/users");

const router = express.Router();

const postRouter = require("./posts");

router.use("/:userId/posts", postRouter);

router.route("/login").post(login);
router.route("/register").post(register);

module.exports = router;
