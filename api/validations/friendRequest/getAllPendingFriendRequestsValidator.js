const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function getAllPendingFriendRequestsValidator(payload) {
    console.log('payload in validator', payload);
    let errors = {};
    payload.userId = !isEmpty(payload.userId) ? payload.userId : '';

    if (Validator.isEmpty(payload.userId)) {
        errors.userId = 'User Id is required';
    }
    payload.type = !isEmpty(payload.type) ? payload.type : '';

    if (Validator.isEmpty(payload.type)) {
        errors.type = 'Type - My Request or New Request - is required';
    }
    if (!Validator.isIn(payload.type, ['my_request', 'new_request'])) {
        errors.type = 'Type - My Request or New Request - is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};