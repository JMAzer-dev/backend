const { validationResult } = require("express-validator");
//Print errors, last middleware call of route 
const validate = (req, res, next) => {
  const errors = validationResult(req);
  // Return next params
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];

  errors.array().map((err) => extractedErrors.push(err.msg));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = validate;
