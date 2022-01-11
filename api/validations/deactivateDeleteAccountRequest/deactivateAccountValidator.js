const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function deactivateDeleteAccountValidator(payload) {
    let errors = {};
    payload.userId = !isEmpty(payload.userId) ? payload.userId : '';

    // if (Validator.isEmpty(payload.userId, { min: 2, max: 30 })) {
    if (Validator.isEmpty(payload.userId)) {
        errors.userId = 'User Id is required';
    }
    payload.password = !isEmpty(payload.password) ? payload.password : '';

    // if (Validator.isEmpty(payload.password, { min: 2, max: 30 })) {
    if (Validator.isEmpty(payload.password)) {
        errors.password = 'Password is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};