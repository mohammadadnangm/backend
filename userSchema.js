const mongoose = require("mongoose");

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

module.exports = User;
