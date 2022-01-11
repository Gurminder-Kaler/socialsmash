const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function updatePasswordValidator (payload) {
    let errors = {};
    payload.userId = !isEmpty(payload.userId) ? payload.userId : '';
    payload.oldPassword = !isEmpty(payload.oldPassword) ? payload.oldPassword : '';
    payload.newPassword = !isEmpty(payload.newPassword) ? payload.newPassword : '';
    payload.confirmPassword = !isEmpty(payload.confirmPassword) ? payload.confirmPassword : '';

    if (Validator.isEmpty(payload.userId, { min: 2, max: 30 })) {

        errors.userId = 'Please Enter User Id of Logged in user';

    }

    if (Validator.isEmpty(payload.oldPassword, { min: 2, max: 30 })) {

        errors.oldPassword = 'Old Password is required';

    }

    if (Validator.isEmpty(payload.newPassword, { min: 2, max: 30 })) {

        errors.newPassword = 'New Password is required';

    }

    if (Validator.isEmpty(payload.confirmPassword, { min: 2, max: 30 })) {

        errors.confirmPassword = 'Confirm Password is required';

    }

    if (payload.confirmPassword.toString() != payload.newPassword.toString()) {

        errors.confirmPassword = 'Confirm Password MisMatch';

    }

    // console.log(payload);
    return {
        errors,
        isValid: isEmpty(errors)
    };
};