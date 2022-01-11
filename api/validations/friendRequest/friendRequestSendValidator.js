const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function friendRequestSendValidator(payload) {
    let errors = {};
    payload.senderId = !isEmpty(payload.senderId) ? payload.senderId : '';
    payload.receiverId = !isEmpty(payload.receiverId) ? payload.receiverId : '';

    if (Validator.isEmpty(payload.senderId)) {
        errors.senderId = 'Sender Id is required';
    }

    if (Validator.isEmpty(payload.receiverId)) {
        errors.receiverId = 'Receiver Id is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};