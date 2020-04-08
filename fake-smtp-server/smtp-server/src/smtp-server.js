const { SMTPServer } = require("smtp-server");
const simpleParser = require("mailparser").simpleParser;

const SMTP_PORT = process.env.SMTP_PORT || 2525;

function startServer(socketIO) {
  const server = new SMTPServer({
    // disable STARTTLS to allow authentication in clear text mode
    disabledCommands: ["STARTTLS", "AUTH"],
    logger: false,
    onData(stream, session, callback) {
      let data = "";
      let mail = {
        subject: "",
        recipient: "",
        sender: "",
        id: "",
        text: "",
        html: "",
        date: null,
        cc: "",
        bcc: "",
        attachments: null
      };
      stream.on("data", src => {
        data += src.toString("utf8");
      });
      stream.on("end", async () => {
        try {
          let parsed = await simpleParser(data);
          mail.sender = parsed.headers.has("from")
            ? parsed.headers.get("from").html
            : "";
          mail.recipient = parsed.headers.has("to")
            ? parsed.headers.get("to").html
            : "";
          mail.id = parsed.messageId
            .replace("<", "")
            .replace(">", "")
            .replace("@", ".");
          mail.subject = parsed.subject;
          mail.text = parsed.text;
          mail.html = parsed.html || parsed.textAsHtml;
          mail.date = parsed.date;
          mail.cc = parsed.headers.has("cc")
            ? parsed.headers.get("cc").html
            : "";
          mail.bcc = parsed.headers.has("bcc")
            ? parsed.headers.get("bcc").html
            : "";

          socketIO.emit("mailRetrieved", mail);
          callback(null);
        } catch (e) {
          console.error(e);
          process.exit(1);
        }
      });
    }
  });

  server.listen(SMTP_PORT);
}

module.exports = {
  startServer
};
