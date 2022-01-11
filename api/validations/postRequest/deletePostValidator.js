const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function deletePostValidator(payload) {
    let errors = {};
    payload.postId = !isEmpty(payload.postId) ? payload.postId : '';

    if (Validator.isEmpty(payload.postId)) {
        errors.postId = 'Post Id is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};