const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function updateTimelineSettingValidator(payload) {
    let errors = {};
    payload.userId = !isEmpty(payload.userId) ? payload.userId : '';

    if (Validator.isEmpty(payload.userId)) {
        errors.userId = 'User Id is required';
    }

    if (!Validator.isIn(payload.type, ['friends_on_timeline', 'profession_on_timeline', 'city_name_on_timeline']))
    {
        errors.type = 'Type can either be friends_on_timeline, profession_on_timeline, city_name_on_timeline';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};