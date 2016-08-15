"use strict";

const mailer     = require("nodemailer");
const htmlToText = require("nodemailer-html-to-text").htmlToText;
const config     = require("config");

exports.postMail = function*(next) {
  let name    = this.request.body.name;
  let email   = this.request.body.email;
  let message = this.request.body.message;

  if (
    !name || !email || !message ||
    name.length > 32 ||
    email.length > 32 ||
    message.length > 1024
  ) {
    this.status = 400;
    this.throw(400);
  }

  // транспорт для отправки письма
  let transporter = mailer.createTransport(config.get("mailer.transport"));

  // если сообщение имеет html содержимое, то преобразуем его в текст
  transporter.use("compile", htmlToText());

  // это делается, т.к используемые транспорт - говно,
  // т.к не поддерживает отправку sender заголовка и т.п.
  message = `<p>${name}(${email}):</p>` + message;

  let mailOptions = Object.assign({
    sender: `"${name}" <${email}>`,
    html: message
  }, config.get("mailer.options"));

  let responseMail = yield transporter.sendMail(mailOptions);

  // произошла ошибка при отправке письма на почту
  if (responseMail instanceof Error) {
    let err = new Error("ошибка отправки письма на почту");

    err.name = "MailError";
    err.error = responseMail;
    err.status = 500;

    this.status = 500;
    this.throw(err);
  }

  this.body = "your message has been sent!";
};
