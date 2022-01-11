const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function likeDisLikeAPostValidator(payload) {
    let errors = {};
    payload.type = !isEmpty(payload.type) ? payload.type : '';
    payload.postId = !isEmpty(payload.postId) ? payload.postId : '';

    if (Validator.isEmpty(payload.type, { min: 2, max: 30 })) {
        errors.type = 'Type is required';
    }

    if (Validator.isEmpty(payload.postId)) {
        errors.postId = 'Post Id is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};