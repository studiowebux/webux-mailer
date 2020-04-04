/**
 * File: index.js
 * Author: Tommy Gingras
 * Date: 2020-04-03
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const nodemailer = require("nodemailer");

/**
 * To configure the mail transporter
 * @param {Object} opts The options to configure the mail instance (https://nodemailer.com/smtp/)
 * @param {Object} log The custom logger function, Default : console
 * @returns {Promise}
 */
function Initialize(opts, log = console) {
  return new Promise(async (resolve, reject) => {
    if (!opts) {
      return reject("webux-mailer - No options defined");
    }
    if (!opts.isEnabled) {
      return reject("webux-mailer - Mail feature is disabled");
    }

    this.log.debug("webux-mailer - Configuring the logger function");
    this.log = log;
    this.log.debug("webux-mailer - Logger function configured");

    if (opts.isEnabled) {
      this.log.debug("webux-mailer - Configuring the transporter");
      this.transporter = nodemailer.createTransport(opts);

      this.log.debug("webux-mailer - Transporter configured");

      this.log.debug(
        "webux-mailer - Verifying the transporter connection and authentication information"
      );
      const verified = await this.transporter.verify().catch(e => {
        return reject(`webux-mailer - ${e.message}`);
      });

      if (!verified) {
        return reject(
          "webux-mailer - Please verify your connection or authentication information"
        );
      }

      this.log.debug(
        "webux-mailer - Transporter connection and authentication verified"
      );

      return resolve(
        "webux-mailer - Transporter connection and authentication verified"
      );
    }
  });
}

/**
 * To send an email
 * @param {Object} data The mail data (https://nodemailer.com/message/)
 * @returns {Promise}
 */
function SendMail(data) {
  return new Promise(async (resolve, reject) => {
    if (!data) {
      return reject(
        "webux-mailer - Unable to send the email, no data provided"
      );
    }

    this.log.debug("webux-mailer - Sending the email");
    const sent = await this.transporter.sendMail(data).catch(e => {
      return reject(`webux-mailer - ${e.message}`);
    });

    if (!sent) {
      this.log.debug(`webux-mailer - email not sent`);
      return reject("webux-mailer - Message not Sent");
    }
    this.log.debug(`webux-mailer - email sent (id: ${sent.messageId})`);
    return resolve(sent);
  });
}

/**
 * The Mailer Function
 * By default, the transporter is set to `undefined`
 * By default, the log is set to `console`
 */
function Mailer() {
  this.transporter;
  this.log = console;

  this.Initialize = Initialize;
  this.SendMail = SendMail;
}

module.exports = Mailer;
