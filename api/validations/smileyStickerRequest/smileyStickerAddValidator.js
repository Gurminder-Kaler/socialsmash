const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function smileyStickerAddValidator
(payload) {
    let errors = {};
    payload.type = !isEmpty(payload.type) ? payload.type : '';

    if (Validator.isEmpty(payload.type, { min: 2, max: 30 })) {
        errors.type = 'Type sticker or smiley is required';
    }

    // console.log(payload);
    return {
        errors,
        isValid: isEmpty(errors)
    };
};