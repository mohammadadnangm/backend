const User = require("./userSchema");

function LoginCheck(req, res) {
  const token = req.cookies.quranTutor;
  console.log("token get succes backend");
  User.findOne({ tokens: token })
    .then((isMatch) => {
      console.log(".then caslled after token matched backend");
      res.writeHead(200, { "Content-Type": "application/json" });
      console.log("after reshead 200 sent bacjend");
      res.write(JSON.stringify(isMatch));
      console.log("after response.write bacjend");
      res.end();
      console.log("after response.end bacjend");
    })
    .catch((error) => {
      console.log("before send catch err backend");
      res.end(error);
      console.log("before send catch err backend");
    });
}

module.exports = LoginCheck;

// const express = require("express");
// const jwt = require("jsonwebtoken");
// require("./dbConn");
// const User = require("./userSchema");
// const app = express();
// app.use(express.json());

// const LoginCheck = async (req, res, next) => {
//   try {
//     const token = req.cookies.quranTutor;
//     const verifyToken = jwt.verify(token, "qwertyuiop1234567890");
//     const rootUser = await User.findOne({ id: verifyToken.id, token: token });
//     console.log("after rootUser await backend");
//     if (rootUser) {
//       res
//         .status(200)
//         .send({ message: "token match authorized user, go to about page" });
//       console.log("rootUser Token matched backend response");
//     }
//     console.log("before making new vars backend");
//     // req.token = token;
//     console.log("before making new rootuser vars backend");
//     // req.rootUser = rootUser;
//     // console.log("before making new rootuserID vars backend");
//     // req.userEmail = rootUser.email;
//     // console.log("after making new rootuserID vars backend");
//     next();
//     console.log("next called backend");
//   } catch (err) {
//     res.status(401).send("unauthorized no token");
//     console.log(err);
//   }
// };

// module.exports = LoginCheck;
