const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("./dbConn");
const User = require("./userSchema");

// middle wares
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// login route
function LoginForm(req, res) {
  const data = req.body;
  const { email, password } = data;

  const user = User.findOne({ email: email })
    .then((user) => {
      if (password === user.password) {
        // res.send({ message: "Login Successfull from backend" });
        //jwt token here
        let myid = user._id;
        let token = jwt.sign({ myid }, "qwertyuiop1234567890");
        user.tokens = token;
        user.save();
        console.log(token);
        //res.send({ message: "Login Successfull from backend" });
        // cookies here
        res.cookie("quranTutor", token, {
          expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
          httpOnly: true,
        });

        res.send({ message: "Login Successfull from backend" });
      } else {
        res.send({ message: "Password didn't match backend" });
      }
    })
    .catch((error) => {
      res.send({ message: "User not registered backend" });
    });
}

module.exports = LoginForm;
