const mongoose = require('mongoose');
const axios = require('axios');
const bcrypt = require('bcrypt');
const User = require('@models/userModel');
const messages = require('@constants/messages');

exports.sendOTP = (req, res) => {
    User.findOne({ mobileNo: req.body.mobileNo })
    .then(user => {
        console.log('user', user);
        if (!user) {
            res.json({
                status: 404,
                success: false,
                message: messages.FAILURE.MOBILE_NOT_FOUND,
            });
        } else {
        const otp = generateOTP();
        let url =`http://mobicomm.dove-sms.com//submitsms.jsp?user=AdearnS&key=cc7f853017XX&mobile=` + req.body.mobileNo + `&message=`+ otp +` is your Skybook sign-up code and is valid for 10 minutes. Please do not share the OTP with anyone.
Regards
Skybook Team
Adearn Services P Ltd &senderid=SMSKYB&accusage=1&entityid=1201160083792850070&tempid=1207161942439108230`;
        axios({
                method: 'get',
                url
            })
            .then(function(response) {
                console.log('response', response.data);
                var split = response.data.split(',');
                console.log('split', split);
                // fail,InvalidMobileNumber,0,0,99193598303
                //sent,success,369684585,877626265,+919919359830
                if (response && split[0] == "\r\nsent") {
                    const filter = { mobileNo: req.body.mobileNo };
                    const update = { otp: otp };
                    User.findOneAndUpdate(filter, { $set: update }, { new: true }, (err, doc) => {
                        if (err) {
                            res.json({
                                status: 501,
                                success: false,
                                message: messages.FAILURE.SWW
                            });
                        }
                    });
                    res.json({
                        status: 200,
                        success: true,
                        message: 'OTP sent to mobile no. : +91' + user.mobileNo
                    });
                } else {
                    if(split[1]=="InvalidMobileNumber") {
                        res.json({
                            status: 501,
                            success: false,
                            message: 'Invalid Mobile No.'
                        });
                    }
                    res.json({
                        status: 501,
                        success: false,
                        message: 'Something went wrong! Resend OTP'
                    });

                }
            });

        }
    })
    .catch(err => {
        res.json({
            status: 500,
            success: false,
            message: err
        });
    });
}

function generateOTP() {
    var string = '123456789';
    let OTP = '';
    var len = string.length;
    for (let i = 0; i < 6; i++ ) {
        OTP += string[Math.floor(Math.random() * len)];
    }
    return OTP;
}

exports.verifyOTP = (req, res) => {
    const filter = { mobileNo: req.body.mobileNo };
    User.findOne(filter).then(user => {
        if (user.otp == req.body.otp) {
            res.json({
                status: 200,
                success: true,
                message: 'OTP verified Successfully, You may change the password now'
            });
        } else {
            res.json({
                status: 401,
                success: false,
                message: 'OTP MisMatch retry or resend OTP.'
            });
        }
    })
    .catch(err => {
        res.json({
            status: 500,
            success: false,
            message: err
        });
    });
}

exports.updatePassword = (req, res) => {
    User.findOne({ mobileNo: req.body.mobileNo })
        .then(user => {
            if (req.body.otp == user.otp) {
                console.log('req.body', req.body);
                bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
                    console.log('hash', hash);
                    if (err) {
                        return res.json({
                            status: 500,
                            success: false,
                            message: err
                        });
                    } else {
                        const filter = { mobileNo: req.body.mobileNo };
                        const update = { password: hash };
                        User.findOneAndUpdate(filter, { $set: update }, {
                            returnOriginal: false
                        }).then(result => {
                            res.json({
                                status: 200,
                                success: true,
                                message: messages.SUCCESS.AUTH.PASSWORD_CHANGED
                            });
                        });
                    }
                });
            } else {
                res.json({
                    status: 401,
                    success: false,
                    message: messages.FAILURE.UNAUTHORIZED
                });
            }
        })
        .catch(err => {
            res.json({
                status: 500,
                success: false,
                message: err
            });
        });
}