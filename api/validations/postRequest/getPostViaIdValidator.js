const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function getPostViaIdValidator(payload) {
    let errors = {};
    payload.postId = !isEmpty(payload.postId) ? payload.postId : '';

    if (Validator.isEmpty(payload.postId, { min: 2, max: 30 })) {
        errors.postId = 'Post Id is required';
    }
    // console.log(payload);
    return {
        errors,
        isValid: isEmpty(errors)
    };
};