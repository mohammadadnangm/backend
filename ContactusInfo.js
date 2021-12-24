const nodemailer = require("nodemailer");

//nodmailer mail sender detail
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "qurantutor@gmail.com",
    pass: "password123",
  },
});

function ContactusInfo(req, res) {
  const { firstName, lastName, phone, email, address, message } = req.body;

  var mailOption = {
    from: "softin.org@gmail.com",
    to: "mohammadadnangm@gmail.com",
    subject: "Contact-Us",
    html: ` <h2>This mail from east medical system</h2>
            <h4>First Name: ${firstName}</h4>
            <h4>Last Name: ${lastName}</h4>
            <h4>Phone: ${phone}</h4>
            <p>Email :${email}</p>
            <p>Address :${address}</p>
            <p>Message :${message}</p>`,
  };

  //send email to user for verify
  transporter.sendMail(mailOption, function (err, info) {
    if (err) {
      console.log("error occured backend");
    } else {
      console.log("Contact us form sent backend");
      res.send({ message: "contact form sent success" });
    }
  });
}

module.exports = ContactusInfo;
