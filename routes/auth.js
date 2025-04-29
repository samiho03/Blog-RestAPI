const express = require("express")
const router = express.Router()    //creating a sub route
const {authController} = require("../controllers")
const {signupValidator, signinValidator,emailValidator, verifyUserValidator,recoverPasswordValidator, changePasswordValidator, updateProfileValidator} = require("../validator/auth")
const validate = require("../validator/validate")
const isAuth = require("../middlewares/isAuth")
const passport = require("passport");
const generateToken = require("../utils/generateToken");

router.post("/signup",signupValidator, validate, authController.signup)

router.post("/signin",signinValidator, validate, authController.signin)

//for verifying email
router.post("/send-verification-email",emailValidator, validate ,authController.verifyCode)

//for verifying user
router.post("/verify-user" ,verifyUserValidator,validate, authController.verifyUser)

//for forgot password code
router.post("/forgot-password-code",emailValidator,validate, authController.forogotPasswordCode)

//to recover the password
router.post("/recover-password",recoverPasswordValidator,validate, authController.recoverPassword)

router.put("/change-password",changePasswordValidator, validate, isAuth, authController.changePassword)

router.put("/update-profile", isAuth, updateProfileValidator , validate , authController.updateProfile)

router.get("/current-user", isAuth, authController.currentUser)

// Redirect to Google OAuth consent screen
router.get("/google", (req, res, next) => {
  const { action } = req.query; // Get the action parameter (login or signup)
  const state = action ? Buffer.from(JSON.stringify({ action })).toString("base64") : undefined; // Pass the action in the state parameter
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state, // Include the state parameter
  })(req, res, next);
});

router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), (req, res) => {
  try {
    const { state } = req.query;
    console.log("State:", state); // Log the state parameter

    const { action } = state ? JSON.parse(Buffer.from(state, "base64").toString()) : {};
    console.log("Action:", action); // Log the action parameter

    if (!req.user) {
      throw new Error("User not found in request");
    }

    const token = generateToken(req.user); // Generate the token
    console.log("Token:", token); // Log the generated token

    // Redirect to the home page with the token
    res.redirect(`http://localhost:3000?token=${token}`);
  } catch (error) {
    console.error("Error in Google OAuth callback:", error);
    res.status(500).json({ code: 500, status: false, message: "Internal Server Error" });
  }
});

module.exports = router

