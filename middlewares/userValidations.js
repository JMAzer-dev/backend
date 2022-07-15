const { body } = require("express-validator");

// User Create Validation
const userCreateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("O nome é obrigatório.")
      .isLength({ min: 3 })
      .withMessage("O nome precisa conter no mínimo 3 caracteres."),
    body("email")
      .isString()
      .withMessage("O e-mail é obrigatório.")
      .isEmail()
      .withMessage("Digite um e-mail válido."),
    body("password")
      .isString()
      .withMessage("A senha é obrigatória.")
      .not()
      .isIn(["password"])
      .withMessage("Tente uma senha mais forte.")
      .isLength({ min: 5 })
      .withMessage("A senha precisa conter no mínimo 5 caracteres.")
      .matches(/\d/)
      .withMessage("A senha deve conter pelo menos 1 número.")
      .custom((value, { req }) => {
        if (value === req.body.name) {
          throw new Error("Tente uma senha mais forte.");
        }
        return true;
      }),
    body("confirmPassword")
      .isString()
      .withMessage("A confirmação da senha é obrigatória.")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("As senhas precisam ser iguais.");
        }
        return true;
      }),
  ];
};

// Login Validation
const loginValidation = () => {
  return [
    body("email")
      .isString()
      .withMessage("O e-mail é obrigatório.")
      .isEmail()
      .withMessage("Insira um e-mail válido."),
    body("password").isString().withMessage("A senha é obrigatória."),
  ];
};

// Update validation
const userUpdateValidation = () => {
  return [
    body("name")
      .optional()
      .isLength({ min: 3 })
      .withMessage("O nome precisa de pelo menos 3 caracteres"),
    body("password")
      .optional()
      .isLength({ min: 5 })
      .withMessage("A nova senha precisa ter no mínimo 5")
      .not()
      .isIn(["password"])
      .withMessage("Tente uma senha mais forte.")
      .isLength({ min: 5 })
      .withMessage("A senha precisa conter no mínimo 5 caracteres.")
      .matches(/\d/)
      .withMessage("A senha deve conter pelo menos 1 número.")
      .custom((value, { req }) => {
        if (value === req.body.name) {
          throw new Error("Tente uma senha mais forte.");
        }
        return true;
      }),
  ];
};

module.exports = {
  userCreateValidation,
  loginValidation,
  userUpdateValidation,
};
