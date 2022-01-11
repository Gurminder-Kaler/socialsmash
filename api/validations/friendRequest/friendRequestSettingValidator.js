const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function friendRequestSettingValidator(payload) {
    let errors = {};
    payload.userId = !isEmpty(payload.userId) ? payload.userId : '';

    if (Validator.isEmpty(payload.userId)) {
        errors.userId = 'User Id is required';
    }

    if (!Validator.isIn(payload.type, ['request_from_public', 'request_from_mutuals', 'accept_all', 'decline_all', 'block_all_requests']))
    {
        errors.type = 'Type can either be request_from_public, request_from_mutuals, accept_all, decline_all or block_all_requests';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};