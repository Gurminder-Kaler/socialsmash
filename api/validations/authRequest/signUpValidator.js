const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.firstName = !isEmpty(data.firstName) ? data.firstName : ''; 
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : ''; 
    data.userName = !isEmpty(data.userName) ? data.userName : '';  

    if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
        errors.firstName = 'First name must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = 'First name field is required';
    }

    if (Validator.isEmpty(data.role)) {
        errors.firstName = 'Role field is required';
    }

    if (!Validator.isIn(data.role, ['CUSTOMER', 'ADMIN'])) {
        errors.role = 'Role can either be ADMIN or CUSTOMER only!';
    }
    // if (Validator.isEmpty(data.email)) {
    //     errors.email = 'Email field is required';
    // } else {
    //     if (!Validator.isEmail(data.email)) {
    //         errors.email = 'Email is invalid';
    //     }
    // }

    // if (Validator.isEmpty(data.accountType)) {
    //     errors.accountType = 'Account Type field is required';
    // }

    // if (!Validator.isIn(data.accountType, ['general', 'business'])) {
    //     errors.accountType = 'Account Type can either be business or general only!';
    // }

    // if (Validator.isEmpty(data.mobileNo)) {
    //     errors.mobileNo = 'Mobile No. field is required';
    // } else {
    //     if (!Validator.isLength(data.mobileNo, { max: 10 })) {
    //         errors.password = 'Mobile No. must be at least 10 characters';
    //     }
    // }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    } else {
        if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
            errors.password = 'Password must be at least 6 characters';
        }
    }

    // if (Validator.isEmpty(data.password2)) {
    //     errors.password2 = 'Confirm Password field is required';
    // }

    // if (!Validator.equals(data.password, data.password2)) {
    //     errors.password2 = 'Passwords do not match';
    // }

    if (Validator.isEmpty(data.userName)) {
        errors.userName = 'User name field is required';
    } else {
        if (!Validator.isLength(data.userName, { min: 6, max: 30 })) {
            errors.userName = 'User name must be at least 6 characters and maximum 30 characters';
        }
    }

    // if (Validator.isEmpty(data.dob)) {
    //     errors.dob = 'Date of birth is required';
    // } else {
    //     var enteredAge = getAge(data.dob);
    //     console.log('enteredAge', enteredAge);
    //     if (enteredAge < 13) {
    //         errors.dob = "You must be above or equal to 13 years of age to sign up";
    //     }

    //     function getAge(dob) {
    //         var today = new Date();
    //         var birthDate = new Date(dob);
    //         var age = today.getFullYear() - birthDate.getFullYear();
    //         var m = today.getMonth() - birthDate.getMonth();
    //         if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    //             age--;
    //         }
    //         return age;
    //     }
    // }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};