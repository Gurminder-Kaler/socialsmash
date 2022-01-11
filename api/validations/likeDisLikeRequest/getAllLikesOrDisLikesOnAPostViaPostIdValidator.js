const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function getAllLikesOrDisLikesOnAPostViaPostIdValidator(payload) {
    let errors = {};
    payload.userId = !isEmpty(payload.userId) ? payload.userId : '';
    payload.postId = !isEmpty(payload.postId) ? payload.postId : '';

    if (Validator.isEmpty(payload.userId, { min: 2, max: 30 })) {
        errors.userId = 'User Id is required';
    }

    if (Validator.isEmpty(payload.postId)) {
        errors.postId = 'Post Id is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};