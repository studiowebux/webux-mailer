const webuxMailer = require("../index");
const { CreateApp } = require("webux-app");

CreateApp();

// email disabled
const options = {
  isEnabled: false,
  host: "",
  port: 465,
  useSSL: true,
  user: "",
  password: ""
};

webuxMailer.init(options);

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

webuxMailer.init(options);

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
