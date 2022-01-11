const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function getGroupsViaUserIdValidator(payload) {
    let errors = {};

    payload.userId = !isEmpty(payload.userId) ? payload.userId : '';

    if (Validator.isEmpty(payload.userId)) {
        errors.userId = 'User Id is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};