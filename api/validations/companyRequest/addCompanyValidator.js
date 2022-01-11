const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function addCompanyValidator(payload) {
  let errors = {};
  payload.category = !isEmpty(payload.category) ? payload.category : "";

  if (Validator.isEmpty(payload.category)) {
    errors.category = "Please select the category";
  }
  payload.name = !isEmpty(payload.name) ? payload.name : "";

  if (Validator.isEmpty(payload.name)) {
    errors.name = "Please enter the name";
  }
  payload.about = !isEmpty(payload.about) ? payload.about : "";

  if (Validator.isEmpty(payload.about)) {
    errors.about = "Please enter the description of the company";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
