# Webux Mailer
This module is a wrapper to send mails, it uses nodemailer.

## Installation 
```bash
npm i --save webux-mailer
```

## Usage
```
const webuxMailer = require("webux-mailer");
const express = require("express");
const app = express();

const options = {
  isEnabled: true,
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
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
SEE LICENSE IN license.txt