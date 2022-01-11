const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function updatePostValidator(payload) {
    let errors = {};
    payload.postId = !isEmpty(payload.postId) ? payload.postId : '';
    payload.post = !isEmpty(payload.post) ? payload.post : '';

    if (Validator.isEmpty(payload.postId, { min: 2, max: 30 })) {
        errors.postId = 'Post Id is required';
    }

    if (Validator.isEmpty(payload.post)) {
        errors.post = 'Post data is required';
    }
    // console.log(payload);
    return {
        errors,
        isValid: isEmpty(errors)
    };
};