const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function commentSaveValidator(payload) {
    let errors = {};
    payload.userId = !isEmpty(payload.userId) ? payload.userId : '';
    payload.postId = !isEmpty(payload.postId) ? payload.postId : '';
    payload.comment = !isEmpty(payload.comment) ? payload.comment : '';

    if (Validator.isEmpty(payload.userId)) {
        errors.userId = 'User Id is required';
    }

    if (Validator.isEmpty(payload.postId)) {
        errors.postId = 'Post Id is required';
    }

    if (Validator.isEmpty(payload.comment)) {
        errors.comment = 'Comment data is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};