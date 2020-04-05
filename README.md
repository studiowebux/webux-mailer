# Webux Mailer

This module is a wrapper to send mails, it uses nodemailer.

> Within this module, there is also a Fake SMTP Server with a simple Web UI to test the features.

## Installation

```bash
npm install --save @studiowebux/mailer
```

## Usage

### Configuration

#### Transport configuration

Official documentation : https://nodemailer.com/smtp/

```javascript
const opts = {
  isEnabled: true,
  host: "127.0.0.1",
  port: 2525,
  secure: false,
  auth: {
    user: "",
    pass: ""
  },
  pool: false,
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  }
};
```

#### Email data object

Official documentation : https://nodemailer.com/message/

```javascript
// NOTE : bcc field is not detected by the mailparser and/or the smtp-server
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

> For testing only, Check the examples/ directory for complete code.

example.js

```javascript
const WebuxMailer = require("@studiowebux/mailer");

const opts = {
  isEnabled: true,
  host: process.env.HOST || "127.0.0.1",
  port: 2525,
  secure: false,
  auth: {
    user: process.env.USER || "",
    pass: process.env.PASSWORD || ""
  }
};

const webuxMailer = new WebuxMailer(opts, console);

const data = {
  from: "test@from.local",
  to: ["test1@to.local", "test2@to.local"],
  subject: "Testing the webux mailer",
  html: "<p>Hello World !</p>",
  text: "Hello World !"
};

webuxMailer.Sendmail(data).then(info => {
  console.log(info);
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

# Before executing these 2 lines, Access the frontend
# Send an email (It can be executed multiple times)
cd ../../examples/
node index.js
```

To launch the example scripts:

```bash
node bad.js
echo "---"
node disabled.js
echo "---"
node failure.js
echo "---"
node incomplete.js
echo "---"
node noOpts.js
echo "---"
node simple.js
echo "---"
node index.js
echo "+++"
```

### Functions

#### constructor(opts, log = console)

Initialize the transporter and the logger function

#### Verify(): Promise\<String\>

Verify the transporter configuration and authentication

```javascript
webuxMailer
  .Verify()
  .then(info => {
    console.log(info);
  })
  .catch(e => {
    console.error(e);
  });
```

#### Sendmail(data): Promise\<Object\>

Send an email if the mailer is enabled

```javascript
const data = {
  from: "test@from.local",
  to: ["test1@to.local", "test2@to.local"],
  subject: "Testing the webux mailer",
  html: "<p>Hello World !</p>",
  text: "Hello World !"
};

webuxMailer
  .Sendmail(data)
  .then(info => {
    console.log(info);
  })
  .catch(e => {
    console.error(e);
  });
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

SEE LICENSE IN license.txt
