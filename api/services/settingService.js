const mongoose = require("mongoose");
const User = require("@models/userModel");
const Company = require("@models/companyModel");
const messages = require("@constants/messages");
const isEmpty = require("@validations/is-empty");
const bcrypt = require("bcrypt");

const updatePasswordValidator = require("@validations/settingRequest/updatePasswordValidator");

const updatePasswordServiceFunc = async (req, res) => {
  try {
    const { errors, isValid } = updatePasswordValidator(req.body);
    if (!isValid) {
      return res.json({
        status: 400,
        success: false,
        message: errors,
      });
    }

    const newPassword = req.body.newPassword.toString(); // New Password

    const oldPassword = req.body.oldPassword.toString(); // Old Password

    const user = await User.findOne({ _id: req.body.userId }).lean().exec();

    bcrypt.compare(oldPassword, user.password.toString(), (err, result) => {
      if (err || result == false) {
        res.json({
          status: 401,
          success: false,
          message: messages.FAILURE.OLD_PASSWORD_MISMATCH,
        });
      } else {
        let filter = {
          _id: req.body.userId,
        };
        bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
          if (err) {
            res.json({
              status: 500,
              success: false,
              message: err,
            });
          } else {
            let update = {
              password: hash,
            };
            User.findOneAndUpdate(
              filter,
              { $set: update },
              { new: false },
              (err, doc) => {
                if (err) {
                  res.json({
                    status: 501,
                    success: false,
                    message: messages.FAILURE.SWW,
                  });
                }
              }
            )
              .then((user) => {
                res.json({
                  status: 200,
                  success: true,
                  message: messages.SUCCESS.AUTH.PASSWORD_CHANGED,
                  data: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    isActive: user.isActive,
                    isDeleted: user.isDeleted,
                    deletedAt: user.deletedAt,
                    mobileNo: user.mobileNo,
                    userName: user.userName,
                    dob: user.dob,
                    role: user.role,
                    reasonForDeleting: user.reasonForDeleting,
                    accountType: user.accountType,
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
          }
        });
      }
    });
  } catch (err) {
    res.json({
      status: 500,
      success: false,
      message: err,
    });
  }
};

const getDashboardCountServiceFunc = async (req, res) => {
  try {
    let generalAccountCount = User.find({ accountType: "general" })
      .lean()
      .exec().length;

    let businessAccountCount = User.find({ accountType: "business" })
      .lean()
      .exec().length;

    let maleAccountCount = User.find({ gender: "male" }).lean().exec().length;

    let femaleAccountCount = User.find({ gender: "female" })
      .lean()
      .exec().length;

    let othersAccountCount = User.find({ gender: "others" })
      .lean()
      .exec().length;

    let allCompaniesCount = Company.find().lean().exec().length;

    res.json({
      status: 200,
      success: true,
      data: {
        generalAccountCount: generalAccountCount,
        businessAccountCount: businessAccountCount,
        maleAccountCount: maleAccountCount,
        femaleAccountCount: femaleAccountCount,
        othersAccountCount: othersAccountCount,
        allCompaniesCount: allCompaniesCount,
      },
    });
  } catch (err) {
    res.json({
      status: 500,
      success: false,
      message: err,
    });
  }
};

module.exports = {
  updatePasswordServiceFunc,
  getDashboardCountServiceFunc,
};
