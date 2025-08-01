const express = require("express")
const productRouter = require("./routes/product.router")
const indexRouter = require("./routes/index.router")
const userRouter = require("./routes/user.router")
const cartRouter = require("./routes/cart.router")
const app = express()
const path = require("path")
const morgon = require("morgan")
const cors = require("cors")

app.use(morgon("dev"))


app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended : true}))



app.use("/", indexRouter) 
app.use("/cart", cartRouter)
app.use("/users", userRouter)
app.use("/products",productRouter)


// module.exports = app



require('dotenv').config();
// const express = require("express");
// const cors = require("cors");
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');

const SignUpRouter = require("./routes/SignUp.Router");
const SignInRouter = require("./routes/SignIn.Router");

app.use("/SignUp", SignUpRouter);
app.use("/SignIn", SignInRouter);

app.use(passport.initialize());

// Configure Passport to use Google OAuth 2.0 strategy
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
  }, (accessToken, refreshToken, profile, done) => {
      // Here, you would typically find or create a user in your database
      // For this example, we'll just return the profile
      return done(null, profile);
  }));

  // Route to initiate Google OAuth flow
  app.get('/auth/google',
      passport.authenticate('google', { scope: ['profile', 'email'] })
  );

  // Callback route that Google will redirect to after authentication
  app.get('/auth/google/callback',
      passport.authenticate('google', { session: false }),
      (req, res) => {
          // Generate a JWT for the authenticated user
          const token = jwt.sign({ id: req.user.id, displayName: req.user.displayName }, process.env.JWT_SECRET, { expiresIn: '1h' });
          // Send the token to the client
          res.json({ token });
      }
  );
} else {
  console.warn("Google OAuth client ID and secret are not set. Skipping Google OAuth setup.");
}

module.exports = app;

