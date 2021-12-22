import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import pkg from "jsonwebtoken";
const { Jwt } = pkg;
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

//connection with mongodb localhost
mongoose
  .connect("mongodb://localhost:27017/erp", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Local DB connection is successfull");
  })
  .catch((err) => {
    console.log(err);
  });

// //connection with mongodb online server
// mongoose
//   .connect(
//     "mongodb+srv://admin:admin@cluster0.cha0f.mongodb.net/quran-tutor-merndb?retryWrites=true&w=majority&ssl=true",
//     { useUnifiedTopology: true, useNewUrlParser: true }
//   )

//   .then(() => {
//     console.log("DB Connected successfully");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  work: String,
  password: String,
  cpassword: String,
  tokens: {
    type: String,
  },
});

// userSchema.methods.generateAuthToken = async function () {
//   try {
//     let token = pkg.sign({ _id: this._id }, "safdsfdsfsdfsdfsdfsdfdcrds");
//     this.tokens = this.tokens.concat({ token: token });
//     await this.save();
//     return token;
//   } catch (err) {
//     console.log(err);
//   }
// };

const User = new mongoose.model("User", userSchema);

//Sign Up Routes

app.post("/signup", (req, res) => {
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
});

// login route

app.post("/signin", function (req, res) {
  const data = req.body;
  const { email, password } = data;
  if (!email || !password) {
    res.send({ message: "please fill email and password properly backend" });
  } else {
    User.findOne({ email: email })
      .then((user) => {
        if (password === user.password) {
          // res.send({ message: "Login Successfull backend" });

          //jwt token here

          let myid = user.id;
          let token = pkg.sign({ myid }, "qwertyuiop1234567890");
          user.tokens = token;
          user.save();
          console.log(token);

          // cookies here
          res.cookie("quranTutor", token, {
            expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
          });
          res.send({ message: "Login Successfull backend" });
        } else {
          res.send({ message: "Password didn't match backend" });
        }
      })
      .catch((error) => {
        res.send({ message: "User not registered backend" });
      });
  }
});

//login routes
// app.post("/signin", (req, res) => {
//   const { email, password } = req.body;
//   User.findOne({ email: email }, (err, user) => {
//     if (user) {
//       if (password === user.password) {
//         res.send("Login Successfull backend");

//         //let token = user.generateAuthToken();
//         // console.log(token);
//         // res.json(token);

//         // jwt token here
//         var myid = user._id;
//         var token = pkg.sign({ myid }, "qwertyuiop1234567890");
//         user.tokens = token;
//         user.save();
//         console.log(token);

//         res.cookie("qurantutor", token);
//         res.end();
//         // cokies here
//         // res.cookie("qurantutor", token, {
//         //   expires: new Date(Date.now() + 90002343200),
//         //   httpOnly: true,
//         // });
//       } else {
//         res.send({ message: "Password didn't match backend" });
//       }
//     } else {
//       res.send({ message: "User not registered backend" });
//     }
//   });
// });

app.listen(5001, () => {
  console.log("Server started at port 5001");
});
