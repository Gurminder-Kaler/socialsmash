const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function commentUpdateValidator(payload) {
    let errors = {};
    payload.commentId = !isEmpty(payload.commentId) ? payload.commentId : '';
    payload.comment = !isEmpty(payload.comment) ? payload.comment : '';

    if (Validator.isEmpty(payload.commentId)) {
        errors.commentId = 'User Id is required';
    }

    if (Validator.isEmpty(payload.comment)) {
        errors.comment = 'Comment data is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};