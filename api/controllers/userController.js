const {
    signUpServiceFunc, 
    signInServiceFunc, 
    updateProfileServiceFunc,
} = require('@services/userService');
 

//@usage : signup Account
exports.signUp = async (req, res) => {
    try {
        return await signUpServiceFunc(req, res);
    } catch(err) {
        return res.json({
            status: 500,
            success: false,
            message: err
        });
    }
}
//@usage : signin Account
exports.signIn = async (req, res) => {
    try {
        return await signInServiceFunc(req, res);
    } catch(err) {
        return res.json({
            status: 500,
            success: false,
            message: err
        });
    }
}
//@usage : updateProfile Account
exports.updateProfile = async (req, res) => {
    try {
        return await updateProfileServiceFunc(req, res);
    } catch(err) {
        return res.json({
            status: 500,
            success: false,
            message: err
        });
    }
}