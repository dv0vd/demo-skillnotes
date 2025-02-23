const bodyParser = require("body-parser");
const express = require("express");
const cookieParser = require("cookie-parser");

const noteController = require("../http/controllers/noteController");
const userController = require("../http/controllers/userController");
const userService = require("../services/userService")
const router = express.Router();
router.use(cookieParser());
router.use(userService.auth);

router.get("/", userController.index);

router.get("/dashboard", userController.dashboard);

router.post("/login", bodyParser.urlencoded({ extended: true }), userController.login);

router.get("/logout", userController.logout);

router.post("/signup", bodyParser.urlencoded({ extended: true }), userController.signup);

router.get('/download/:id', userService.authApi, noteController.downloadNote);

module.exports = router;
