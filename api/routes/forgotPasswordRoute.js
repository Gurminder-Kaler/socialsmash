
const express = require('express');
const router = express.Router();

const ForgotPasswordController = require('@controllers/forgotPasswordController');

router.post('/sendOTP', ForgotPasswordController.sendOTP);

router.post('/verifyOTP', ForgotPasswordController.verifyOTP);

router.post('/updatePassword', ForgotPasswordController.updatePassword);


module.exports = router;