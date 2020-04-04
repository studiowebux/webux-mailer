# Webux Mailer

This module is a wrapper to send mails, it uses nodemailer.

## Installation

```bash
npm install --save webux-mailer
```

## Usage

### Configuration

Transport configuration

```javascript
const opts = {
  isEnabled: true,
  host: "127.0.0.1",
  port: 2525,
  secure: false,
  auth: {
    user: "",
    pass: ""
  }
};
```

Email data object

```javascript
// Data structure : https://nodemailer.com/message/
// bcc field is not detected by the mailparser and/or the smtp-server
const data = {
  from: "test@from.local",
  to: ["test1@to.local", "test2@to.local"],
  cc: ["test3@cc.local", "test5@cc.local", "test6@cc.local"],
  bcc: ["test4@bcc.local"],
  subject: "Testing the webux mailer",
  html: "<p>Hello World !</p>",
  text: "Hello World !"
};
```

### Quick start

example.js

```javascript
const WebuxMailer = require("@studiowebux/mailer");

const webuxMailer = new WebuxMailer();

const options = {
  isEnabled: true,
  host: process.env.HOST || "127.0.0.1",
  port: 2525,
  secure: false,
  auth: {
    user: process.env.USER || "",
    pass: process.env.PASSWORD || ""
  }
};

webuxMailer.Initialize(opts).then(info => {
  const data = {
    from: "test@from.local",
    to: ["test1@to.local", "test2@to.local"],
    subject: "Testing the webux mailer",
    html: "<p>Hello World !</p>",
    text: "Hello World !"
  };

  webuxMailer.SendMail(data).then(info => {
    console.log(info);
  });
});
```

#### Fake SMTP Server with Web UI

It will start the server, then the frontend and send an email.

```bash
# Start the smtp-server and socket.IO
cd fake-smtp-server/
npm install
npm start &

# Start the frontend
cd ./frontend
npm install
npm run serve &

# Send an email
cd ../../examples/
node index.js
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

SEE LICENSE IN license.txt
