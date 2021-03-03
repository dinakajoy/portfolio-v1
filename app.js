const express = require('express');
const path = require('path');
const cors = require('cors');

const { contactFormValidationRules, validate } = require('./validators/form');
const contactForm = require('./mail/contact');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})
app.get('/about-me', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
})
app.get('/bio', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'bio.html'));
})
app.get('/contact-me', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
})
app.get('/projects', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'projects.html'));
})
app.get('/wordpress-projects', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'wordpress-projects.html'));
})
app.get('/talks', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'talks.html'));
})

// app.post('/contact-form', contactFormValidationRules(), validate, (req, res) => {
app.post('/contact-form', (req, res) => {
  const data = { ...req.body };
  console.log(data);
  // contactForm.contactMail(data, (error, response) => {
  //   if (error) {
  //     res.status(500).json({ error: error });
  //   } else {
  //     res.status(200).json({ message: response });
  //   }
  // });
  return 'success'
});

app.get("/sw_Site.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./sw_Site.js"));
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', '/not_found.html'));
})

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log();
})