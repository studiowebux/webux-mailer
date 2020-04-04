const WebuxMailer = require("../src/index");

try {
  const webuxMailer = new WebuxMailer();

  const opts = {
    isEnabled: true,
    host: "127.0.0.1",
    port: 2525,
    secure: false
  };

  webuxMailer
    .Initialize(opts)
    .then(() => {
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

      webuxMailer
        .SendMail(data)
        .then(info => {
          console.log(info);
        })
        .catch(e => {
          console.error(e);
        });
    })
    .catch(e => {
      console.error(e);
      process.exit(1);
    });
} catch (e) {
  console.error(e);
  process.exit(2);
}
