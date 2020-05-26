const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');
require('dotenv').config();

const auth = {
  auth: {
    api_key: `${process.env.api_key}`,
    domain: `${process.env.domain}`
  }
}

const transport = nodemailer.createTransport(mailGun(auth));

const sendMail = (from, name, subject, body, cb) => {
  const mailOptions = {
    from: from,
    to: 'dinakajoy@gmail.com',
    subject: `Portfolio Contact - Name: ${name}, Subject: ${subject}`,
    text: body
  };
  transport.sendMail(mailOptions, (err, data) => {
    if(err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  })
};

module.exports = sendMail;