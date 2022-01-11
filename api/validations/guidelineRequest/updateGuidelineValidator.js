const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function updateGuidelineValidator(payload) {
    let errors = {};
    payload.data = !isEmpty(payload.data) ? payload.data : '';

    if (Validator.isEmpty(payload.data)) {
        errors.data = 'Guideline Data is required cannot be left Empty';
    }
    payload.type = !isEmpty(payload.type) ? payload.type : '';

    if (Validator.isEmpty(payload.type)) {
        errors.data = 'Type- Guideline,Aboutus or Contactus is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};