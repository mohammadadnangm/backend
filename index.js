const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("./dbConn");
const User = require("./userSchema");
const LoginCheck = require("./LoginCheck");
const LoginForm = require("./LoginForm");
const SignupForm = require("./SignupForm");
const ContactusInfo = require("./ContactusInfo");
const logout = require("./logout");

// middle wares
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

//about me page here...
app.get("/aboutme", LoginCheck);

//sign in route
app.post("/signin", LoginForm);

//Signup Route
app.post("/signup", SignupForm);

//contact us form route
app.post("/contactus", ContactusInfo);

//Logout page  route
app.get("/logout", (req, res) => {
  res.clearCookie("quranTutor", { path: "/" });
  res.status(200).send("user logged");
});

// listening server port of node and express
app.listen(5001, () => {
  console.log("Server started at port 5001");
});
