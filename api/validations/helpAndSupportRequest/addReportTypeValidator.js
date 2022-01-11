const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function addReportTypeValidator(payload) {
    let errors = {};
    payload.data = !isEmpty(payload.data) ? payload.data : '';

    if (Validator.isEmpty(payload.data)) {
        errors.data = 'Data is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};