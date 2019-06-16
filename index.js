// ███╗   ███╗██╗██████╗ ██████╗ ██╗     ███████╗██╗    ██╗ █████╗ ██████╗ ███████╗
// ████╗ ████║██║██╔══██╗██╔══██╗██║     ██╔════╝██║    ██║██╔══██╗██╔══██╗██╔════╝
// ██╔████╔██║██║██║  ██║██║  ██║██║     █████╗  ██║ █╗ ██║███████║██████╔╝█████╗
// ██║╚██╔╝██║██║██║  ██║██║  ██║██║     ██╔══╝  ██║███╗██║██╔══██║██╔══██╗██╔══╝
// ██║ ╚═╝ ██║██║██████╔╝██████╔╝███████╗███████╗╚███╔███╔╝██║  ██║██║  ██║███████╗
// ╚═╝     ╚═╝╚═╝╚═════╝ ╚═════╝ ╚══════╝╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝

/**
 * File: index.js
 * Author: Tommy Gingras
 * Date: 2018-07-05
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const nodemailer = require("nodemailer");
const { Webux } = require("webux-app");

let Transporter;

const init = options => {
  if (!options.isEnabled) {
    Webux.log.warn("MAIL_FEATURE_DISABLED");
  } else {
    Transporter = nodemailer.createTransport({
      host: options.host,
      port: options.port,
      secure: options.useSSL, // use SSL
      auth: {
        user: options.user,
        pass: options.password
      }
    });
  }
};

const mail = (sender, recipient, subject, text, body) => {
  return new Promise((reject, resolve) => {
    if (!Transporter) {
      Webux.log.warn("TRIED_TO_SEND_EMAIL_BUT_MAIL_FEATURE_DISABLED");
      return reject(new Error("MAIL_FEATURE_DISABLED_NOT_SENT"));
    } else {
      const email = {
        from: sender,
        to: recipient,
        subject: subject,
        text: text,
        body: body
      };
      Transporter.sendMail(email, (err, sent) => {
        if (err) {
          Webux.log.error(err);
          return reject(err);
        }

        Webux.log.info(sent);
        return resolve(sent);
      });
    }
  });
};

module.exports = { init, mail };
