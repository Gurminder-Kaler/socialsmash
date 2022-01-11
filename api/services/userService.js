const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const messages = require("@constants/messages");
const User = require("@models/userModel");
const signUpValidator = require("@validations/authRequest/signUpValidator");
const myAccountValidator = require("@validations/myAccountRequest/myAccountValidator");
const deleteAccountValidator = require("@validations/deactivateDeleteAccountRequest/deleteAccountValidator");
const deactivateAccountValidator = require("@validations/deactivateDeleteAccountRequest/deactivateAccountValidator");
const updateAccountSettingValidator = require("@validations/accountSettingRequest/updateAccountSettingValidator");
const updateTimelineSettingValidator = require("@validations/timeLineSettingRequest/updateTimelineSettingValidator");
const axios = require("axios");
const { OAuth2Client } = require("google-auth-library");
const { GOOGLE } = require("@constants/keys");
 
//done-===sign up starts here
const signUpServiceFunc = async (req, res) => {
  try {
    console.log('console//////', req.body)
 // Check Validation
  // const { errors, isValid } = signUpValidator(req.body);
  // if (!isValid) {
  //   // Return any errors with 400 status

  //   res.json({
  //     status: 400,
  //     success: false,
  //     message: errors,
  //   });
  // }
  console.log('line 31')
    await User.find({
      email: req.body.email,
    }) 
    .then((u) => {
      console.log('3777')
      if (u.length>0) {
        res.json({
          status: 409,
          success: false,
          message: messages.FAILURE.EMAIL_ALREADY_TAKEN,
        });
      } else {
        User.find({
          userName: req.body.userName,
        }) 
        .then((us) => {
          console.log('3777')
          if (us.length>0) {
            res.json({
              status: 409,
              success: false,
              message: messages.FAILURE.USERNAME_ALREADY_TAKEN,
            });
          } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.json({
              status: 500,
              success: false,
              message: err,
            });
          } else {   
            const userConst = new User({
              _id: new mongoose.Types.ObjectId(),
              firstName: req.body.firstName,
              lastName: req.body.lastName, 
              userName: req.body.userName, 
              role: req.body.role, 
              email: req.body.email, 
              password: hash, 
            });
            userConst.save().then((result) => {
                console.log('result111', result);
              if (result) {
                res.json({
                  status: 200,
                  success: true,
                  message: messages.SUCCESS.USER.CREATED,
                  data: result, 
                });
              }
            });
          }   
        });
          }
        });
        
      }
    });
  console.log('77')
  } catch(err) {
    res.json({
      status: 500,
      success: false,
      message: "err",
    });
  }
};

//done
const signInServiceFunc = async (req, res) => { 
  console.log('email | body', req.body);
  User.findOne({
    email: req.body.email,
  }) 
    .then((user) => {
      if (!user) {
        res.json({
          status: 401,
          success: false,
          message: messages.FAILURE.AUTH_FAILED,
        });
      }
      // console.log('user password', user.password);
      // console.log('body password', req.body.password);
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        // console.log('result', result);
        if (err) {
          res.json({
            status: 401,
            success: false,
            message: messages.FAILURE.AUTH_FAILED,
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user.email,
              userId: user._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "11h",
            }
          );
          res.json({
            status: 200,
            success: true, 
            message: messages.SUCCESS.AUTH.LOGGEDIN,
            token: token,
            data: {
              id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email, 
              userName: user.userName
            },
          });
        } else {
          res.json({
            status: 401,
            success: false,
            message: messages.FAILURE.AUTH_FAILED,
          });
        }
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        success: false,
        message: err,
      });
    }); 
};

//done
const updateProfileServiceFunc = async (req, res) => { 
  console.log('email | body', req.body);
  User.findOne({
    email: req.body.email,
  }) 
  .then((user) => {
    if (!user) {
      res.json({
        status: 401,
        success: false,
        message: messages.FAILURE.USER_NOT_FOUND,
      });
    }
    let fields = {
      'firstName' : req.body.firstName,
      'lastName' : req.body.lastName,
    }
    User.findOneAndUpdate(
    {
      email: req.body.email,
    },
      { $set: fields },
      { new: true }
    ).then((result) => {
      console.log("result", result);
      res.json({
        success: true,
        message: messages.SUCCESS.COMPANY.UPDATED,
        data: {
          id: result._id,
          name: result.name,
          about: result.about,
          image: result.image,
          coverImage: result.coverImage,
          createdAt: result.createdAt,
          updatedAt: result.updatedAt,
        },
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        success: false,
        message: err,
      });
    });  
  }).catch((err) => {
    res.json({
      status: 500,
      success: false,
      message: err,
    });
  }); 
  
};
 

const saveOrUpdateServiceFunc = (module.exports = { 
  signUpServiceFunc,
  signInServiceFunc,
  updateProfileServiceFunc
});
