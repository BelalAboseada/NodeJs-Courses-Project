const { body } = require("express-validator");

const validationSchema = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("Title is required!")
      .isLength({ min: 3 })
      .withMessage("Title is at least 3 characters"),
    body("price").notEmpty().withMessage("Price is required!"),
  ];
};

module.exports = { validationSchema };