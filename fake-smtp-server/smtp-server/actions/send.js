module.exports = () => {
  // To test the fake SMTP Server

  "use strict";

  const nodemailer = require("nodemailer");

  try {
    const transporter = nodemailer.createTransport({
      host: "127.0.0.1",
      port: 2525,
      secure: false,
      // auth: {
      //   user: options.user,
      //   pass: options.password
      // }
    });

    const email = {
      from: "test@here.local",
      to: "test@somewhere.local",
      subject: "This is a test",
      text: "Did you receive my email ?",
      html: "<h1>Hey !</h1><p>Did you receive my email ?</p>",
    };
    transporter.sendMail(email, (err, sent) => {
      if (err) {
        console.error(err);
      }
      console.info(sent);
      return true;
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};
