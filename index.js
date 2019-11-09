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

let Transporter;
let logger = {};

/**
 * this function initialise the configuration for the mailer.
 * @param {Object} options The options, the configuration of the logging module, mandatory
 * @param {Function} app The app, an express function, mandatory
 * @param {Object} log The log function, optional
 * @return {VoidFunction} return nothing
 */
const init = (options, app, log = console) => {
  if (!options || typeof options !== "object") {
    throw new Error("The options parameter is required and must be an object");
  }
  if (!app || typeof app !== "function") {
    throw new Error(
      "The app parameter is required and must be an express function"
    );
  }
  if (log && typeof log !== "object") {
    throw new Error("The log parameter must be an object");
  }

  if (options && !options.isEnabled) {
    log.warn("MAIL_FEATURE_DISABLED");
  }

  logger = log;
  if (options && options.isEnabled) {
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

/**
 * this function logs the request contents. Actually this is only a morgan wrapper.
 * @param {String} sender from who the email is sent, mandatory
 * @param {String} recipient to who the email is sent, mandatory
 * @param {String} subject the subject, mandatory
 * @param {String} text the email in text format, mandatory
 * @param {String} body the email in html format, mandatory
 * @return {Promise} return a promise
 */
const mail = (sender, recipient, subject, text, body) => {
  return new Promise((reject, resolve) => {
    if (!Transporter) {
      logger.warn("TRIED_TO_SEND_EMAIL_BUT_MAIL_FEATURE_DISABLED");
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
          logger.error(err);
          return reject(err);
        }
        logger.info(sent);
        return resolve(sent);
      });
    }
  });
};

module.exports = { init, mail };
