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
 * @param {Object} opts The options to configure the mail instance
 * @param {Object} log The custom logger function, Default : console
 * @returns {Promise}
 */
function Initialize(opts, log = console) {
  return new Promise((resolve, reject) => {
    try {
      console.log(typeof log);
      if (!opts) {
        return reject("webux-mailer - No options defined");
      }
      if (!opts.isEnabled) {
        return reject("webux-mailer - Mail feature is disabled");
      }

      this.log = log;

      if (opts.isEnabled) {
        this.log.debug("webux-mailer - Configuring the transporter");
        this.transporter = nodemailer.createTransport({
          host: opts.host,
          port: opts.port,
          secure: opts.secure, // use SSL BOOLEAN
          auth: {
            user: opts.user,
            pass: opts.password
          }
        });
        return resolve("Transporter configured");
      }
    } catch (e) {
      throw e;
    }
  });
}

/**
 * To send an email
 * @param {Object} data The mail data (https://nodemailer.com/message/)
 * @returns {Promise}
 */
function SendMail(data) {
  return new Promise((resolve, reject) => {
    try {
      if (!data) {
        return reject("No data provided");
      }

      this.transporter.sendMail(data, (err, sent) => {
        if (err) {
          throw err;
        }
        this.log.debug(sent);
        return resolve(sent);
      });
    } catch (e) {
      throw e;
    }
  });
}

/**
 * The Mailer Function
 */
function Mailer() {
  this.transporter = null;
  this.log = console;

  this.Initialize = Initialize;
  this.SendMail = SendMail;
}

module.exports = Mailer;
