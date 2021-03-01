const { body, validationResult } = require('express-validator');

const contactFormValidationRules = () => {
  return [
    body('uname').isLength({ min: 2 }).trim().escape(),
    body('subject').isLength({ min: 11, max: 11 }).trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('body').isLength({ min: 2 }).trim().escape(),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(422).json({
    error: 'Please ensure you entered correct data in all fields',
  });
};

module.exports = {
  contactFormValidationRules,
  validate
};