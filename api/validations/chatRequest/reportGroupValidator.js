const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function reportGroupValidator(payload) {
    let errors = {};
    payload.groupId = !isEmpty(payload.groupId) ? payload.groupId : '';

    if (Validator.isEmpty(payload.groupId)) {
        errors.groupId = 'Group Id is required';
    }

    payload.userId = !isEmpty(payload.userId) ? payload.userId : '';

    if (Validator.isEmpty(payload.userId)) {
        errors.userId = 'User Id is required';
    }

    payload.message = !isEmpty(payload.message) ? payload.message : '';

    if (Validator.isEmpty(payload.message)) {
        errors.message = 'Message is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};