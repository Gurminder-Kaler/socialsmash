const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function addCompanyCategoryValidator(payload) {
    let errors = {};
    payload.category = !isEmpty(payload.category) ? payload.category : '';

    if (Validator.isEmpty(payload.category)) {
        errors.category = 'Please Enter the name of the category';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};