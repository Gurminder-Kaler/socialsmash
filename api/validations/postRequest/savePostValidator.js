const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function savePostValidator(payload) {
    let errors = {};
    payload.userId = !isEmpty(payload.userId) ? payload.userId : '';
    payload.typeOfPost = !isEmpty(payload.typeOfPost) ? payload.typeOfPost : 'normal_post';
    payload.post = !isEmpty(payload.post) ? payload.post : '';

    if (!Validator.isIn(payload.typeOfPost, ['normal_post', 'company_post']))
    {
        errors.type = 'Type can either be normal_post, company_post';
    }

    if (Validator.isEmpty(payload.userId, { min: 2, max: 30 })) {
        errors.userId = 'User Id is required';
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