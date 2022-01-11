const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function getGuidelineValidator(payload) {
    let errors = {};
    payload.type = !isEmpty(payload.type) ? payload.type : '';

    if (Validator.isEmpty(payload.type)) {
        errors.data = 'Type- Guideline,Aboutus or Contactus is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};