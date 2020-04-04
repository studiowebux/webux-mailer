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
