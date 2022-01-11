const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function getMessagesViaGroupIdValidator(payload) {
    let errors = {};
    payload.groupId = !isEmpty(payload.groupId) ? payload.groupId : '';

    if (Validator.isEmpty(payload.groupId)) {
        errors.groupId = 'Group Id is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};