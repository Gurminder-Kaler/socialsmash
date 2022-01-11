const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function createGroupValidator(payload) {
    let errors = {};
    payload.name = !isEmpty(payload.name) ? payload.name : '';

    if (Validator.isEmpty(payload.name)) {
        errors.name = 'Group Name is required';
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