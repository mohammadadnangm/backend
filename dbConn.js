const mongoose = require("mongoose");

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
//     console.log("DB Connected successfully *Online*");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
