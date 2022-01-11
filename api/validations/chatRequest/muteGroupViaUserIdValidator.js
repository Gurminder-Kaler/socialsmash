const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function muteGroupViaGroupIdValidator(payload) {
    let errors = {};
    payload.groupId = !isEmpty(payload.groupId) ? payload.groupId : '';

    if (Validator.isEmpty(payload.groupId)) {
        errors.groupId = 'Group Id is required';
    }

    payload.userId = !isEmpty(payload.userId) ? payload.userId : '';

    if (Validator.isEmpty(payload.userId)) {
        errors.userId = 'User Id is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};