const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function updateFriendRequestStatusValidator(payload) {
    let errors = {};
    console.log('payload', payload);
    payload.senderId = !isEmpty(payload.senderId) ? payload.senderId : '';
    payload.receiverId = !isEmpty(payload.receiverId) ? payload.receiverId : '';
    payload.status = !isEmpty(payload.status) ? payload.status : '';

    if (Validator.isEmpty(payload.senderId)) {
        errors.senderId = 'Sender Id is required';
    }

    if (Validator.isEmpty(payload.receiverId)) {
        errors.receiverId = 'Receiver Id is required';
    }

    if (Validator.isEmpty(payload.status)) {
        errors.status = 'status: accepted, rejected, pending, unfriended, blocked, hidden is required';
    }
    if (!Validator.isIn(payload.status, ['accepted', 'rejected', 'pending', 'unfriended', 'blocked', 'hidden'])) {
        errors.status = 'Status can either be accepted, rejected, pending, unfriended, blocked, hidden only!';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};