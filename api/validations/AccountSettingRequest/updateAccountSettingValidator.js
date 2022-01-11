const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function updateAccountSettingValidator(payload) {

    let errors = {};
    payload.userId = !isEmpty(payload.userId) ? payload.userId : '';
    payload.visibleTo = !isEmpty(payload.visibleTo) ? payload.visibleTo : '';
    payload.hideFriendList = !isEmpty(payload.hideFriendList) ? payload.hideFriendList : false;
    payload.lockChatBox = !isEmpty(payload.lockChatBox) ? payload.lockChatBox : false;

    console.log('payloiad object ', !isEmpty(payload.lockChatBox));
    if (Validator.isEmpty(payload.userId)) {
        errors.userId = 'User Id is required';
    }

    if (Validator.isEmpty(payload.visibleTo)) {
        errors.visibleTo = 'visibleTo is Required';
    }

    if (!Validator.isIn(payload.visibleTo, ['public', 'friends_only', 'only_me']))
    {
        errors.visibleTo = 'visibleTo can either be public, friends_only or only_me';
    }

    // if (Validator.isEmpty(payload.hideFriendList)) {
    //     errors.hideFriendList = 'hideFriendList is Required | true or false';
    // }

    // if (Validator.isEmpty(payload.lockChatBox)) {
    //     errors.lockChatBox = 'lockChatBox is Required | true or false';
    // }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};