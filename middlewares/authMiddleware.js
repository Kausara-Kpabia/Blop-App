const jwt = require("jsonwebtoken");
const User = require("../models/users");
require("dotenv").config();

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token === null) {
      res.send("Unauthorized!");
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        res.send("Unauthorized!");
      }
      if (user) {
        let userr = await User.findById(user.id);
        req.user = userr;
        req.email = userr.email;
        next();
      }
    });
  } catch (err) {
    console.log(err.message);
  }

  // if (req.token.user === null) {
  //   res.redirect("login");
  // }
};

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/signup");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

module.exports = { checkUser, requireAuth, authenticateToken };
