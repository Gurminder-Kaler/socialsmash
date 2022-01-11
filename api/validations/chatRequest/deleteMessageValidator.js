const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function deleteMessageValidator(payload) {
    let errors = {};

    payload.messageId = !isEmpty(payload.messageId) ? payload.messageId : '';

    if (Validator.isEmpty(payload.messageId)) {
        errors.messageId = 'Message Id is required';
    }

    payload.userId = !isEmpty(payload.userId) ? payload.userId : '';

    if (Validator.isEmpty(payload.userId)) {
        errors.userId = 'User Id is required';
    }

    if (!Validator.isIn(payload.deletedType, ['for_all', 'for_me']))
    {
        errors.type = 'Type can either be for_all or for_me';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    };
};