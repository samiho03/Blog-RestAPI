const express = require("express");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
dotenv.config();
const connectMongodb = require("./init/mongodb");
const { authRoute, categoryRoute, fileRoute, postRoute } = require("./routes");
const { errorHandler } = require("./middlewares");
const notFound = require("./controllers/notfound");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/User"); // Import the User model



const app = express();

// Connect to database
connectMongodb();

// Third-party middleware
app.use(express.json({ limit: "500mb" }));
app.use(bodyparser.urlencoded({ limit: "500mb", extended: true }));
app.use(morgan("dev"));
app.use(cors());

// Configure express-session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "Sakuni@177777", // Use a secure secret key
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session()); // Enable session support for Passport


// Route section
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/file", fileRoute);
app.use("/api/v1/posts", postRoute);

// Catch-all route for unmatched paths
app.use("*", notFound);

// Error handling middleware
app.use(errorHandler);

// Passport Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/api/v1/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      // Check if the user already exists in your database
      const user = await User.findOne({ googleId: profile.id });

      if (user) {
        return done(null, user);
      } else {
        // Create a new user if they don't exist
        const newUser = new User({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          isVerified: true, // Mark the user as verified
        });

        await newUser.save();
        return done(null, newUser);
      }
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// Initialize Passport
app.use(passport.initialize());

module.exports = app;