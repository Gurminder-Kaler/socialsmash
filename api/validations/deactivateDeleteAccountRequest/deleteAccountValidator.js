const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function deleteAccountValidator(payload) {
    let errors = {};
    payload.userId = !isEmpty(payload.userId) ? payload.userId : '';

    if (Validator.isEmpty(payload.userId)) {
        errors.userId = 'User Id is required';
    }
    payload.password = !isEmpty(payload.password) ? payload.password : '';

    if (Validator.isEmpty(payload.password)) {
        errors.password = 'Password is required';
    }
    payload.reasonForDeleting = !isEmpty(payload.reasonForDeleting) ? payload.reasonForDeleting : '';

    if (Validator.isEmpty(payload.reasonForDeleting)) {
        errors.reasonForDeleting = 'Please let us know the reason you want to delete';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};