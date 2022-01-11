const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function commentDeleteValidator(payload) {
    let errors = {};
    payload.commentId = !isEmpty(payload.commentId) ? payload.commentId : '';

    if (Validator.isEmpty(payload.commentId)) {
        errors.commentId = 'Comment Id is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};