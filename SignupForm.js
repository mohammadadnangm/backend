const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("./dbConn");
const User = require("./userSchema");
const LoginCheck = require("./LoginCheck");
const LoginForm = require("./LoginForm");

// middle wares
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

//Sign Up Routes

function SignupForm(req, res) {
  const { name, email, phone, work, password, cpassword } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "User already registerd backend" });
    } else {
      const user = new User({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({
            message: "Successfully Registered, Please login now. backend",
          });
        }
      });
    }
  });
}

module.exports = SignupForm;
