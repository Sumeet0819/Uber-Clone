const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userContoller = require("../controllers/user.controller");
const authMiddleware = require('../middlewares/auth.middleware')

router.post(
  "/register",
  [
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be atleast 3 characters"),
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 characters"),
  ],
  userContoller.registerUser,
);

router.post("/login", [
  body("email").isEmail().withMessage("Invalid Email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters"),
],
userContoller.loginUser);

router.get('/profile',authMiddleware.authUser,userContoller.getUserProfile)
router.get('/logout',authMiddleware.authUser,userContoller.logoutUser)
module.exports = router;
