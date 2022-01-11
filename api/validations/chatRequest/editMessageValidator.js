const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function editMessageValidator(payload) {
    let errors = {};
    payload.messageId = !isEmpty(payload.messageId) ? payload.messageId : '';

    if (Validator.isEmpty(payload.messageId)) {
        errors.messageId = 'Message Id is required';
    }

    payload.userId = !isEmpty(payload.userId) ? payload.userId : '';

    if (Validator.isEmpty(payload.userId)) {
        errors.userId = 'User Id is required';
    }

    payload.message = !isEmpty(payload.message) ? payload.message : '';

    if (Validator.isEmpty(payload.message)) {
        errors.message = 'Message field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};