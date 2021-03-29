const nodemailer = require('nodemailer');
const smtp = require('nodemailer-smtp-transport');
require('dotenv').config();

exports.contactMail = (formData, cb) => {
  const transporter = nodemailer.createTransport({
    host: "standardspeechguide.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: process.env.USER,
    to:  process.env.RECIEVER,
    subject: 'New Contact Form data',
    html: `
      <h2>Treat As Urgent</h2>
      <P>Someone just contacted me via my portfolio website. Details below: </p>
      <br />
      <p><strong>Name: </strong> ${formData.name}</p>
      <p><strong>Email: </strong> ${formData.email}</p>
      <p><strong>Subject: </strong> ${formData.subject}</p>
      <p><strong>Message: </strong> ${formData.body}</p>
      <br />
      <br />
      <p>Please reply only to email in the body</p>
    `,
  };

  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take our messages', success);
    }
  });

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      cb(err.message, null);
    } else {
      cb(null, "Your message was successfully sent! Expect feedback shortly");
    }
  });
};