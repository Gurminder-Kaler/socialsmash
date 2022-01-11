const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function searchPeopleValidator (payload) {
    let errors = {};
    payload.userId = !isEmpty(payload.userId) ? payload.userId : '';
    payload.keyword = !isEmpty(payload.keyword) ? payload.keyword : '';
    payload.type = !isEmpty(payload.type) ? payload.type : '';

    if (Validator.isEmpty(payload.userId, { min: 2, max: 30 })) {

        errors.userId = 'Please Enter User Id of Logged in user';

    }

    if (Validator.isEmpty(payload.keyword, { min: 2, max: 30 })) {

        errors.keyword = 'Please Type something to be searched';

    }
    if (Validator.isEmpty(payload.type, { min: 2, max: 30 })) {

        errors.type = 'Type - my_friends or find_new_people - is required';

    }
    if (!Validator.isIn(payload.type, ['my_friends', 'find_new_people'])) {

        errors.type = 'Type - my_friends or find_new_people - Please enter either';

    }

    // console.log(payload);
    return {
        errors,
        isValid: isEmpty(errors)
    };
};