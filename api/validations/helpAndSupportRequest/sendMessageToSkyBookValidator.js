const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function sendMessageToSkyBookValidator(payload) {
    let errors = {};
    payload.userId = !isEmpty(payload.userId) ? payload.userId : '';

    if (Validator.isEmpty(payload.userId)) {
        errors.userId = 'User Id is required';
    }

    payload.message = !isEmpty(payload.message) ? payload.message : '';

    if (Validator.isEmpty(payload.message)) {
        errors.data = 'Message is required';
    }
    payload.reportType = !isEmpty(payload.reportType) ? payload.reportType : '';

    if (Validator.isEmpty(payload.reportType)) {
        errors.reportType = 'Please select report type';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};