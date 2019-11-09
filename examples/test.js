const webuxMailer = require("../index");
const { CreateApp, Webux } = require("@studiowebux/app");

CreateApp();

// email disabled
console.log("Enter the information of your mail server.")
const options = {
  isEnabled: false,
  host: process.env.HOST || "",
  port: 465,
  useSSL: true,
  user: process.env.USER || "",
  password: process.env.PASSWORD || ""
};

webuxMailer.init(options, app);

webuxMailer
  .mail(
    "sender@mail.com",
    "recipient@mail.com",
    "Hello world",
    "Hello World",
    "<b>Hello World ! </b>"
  )
  .then(sent => {
    console.log(sent);
  })
  .catch(err => {
    console.error(err);
  });

// Email enabled
options.isEnabled = true;

webuxMailer.init(options, app);

webuxMailer
  .mail(
    "sender@mail.com",
    "recipient@mail.com",
    "Hello world",
    "Hello World",
    "<b>Hello World ! </b>"
  )
  .then(sent => {
    console.log(sent);
  })
  .catch(err => {
    console.error(err);
  });
