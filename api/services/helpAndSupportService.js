const mongoose = require("mongoose");
const SendMessageToSkyBook = require("@models/sendMessageToSkyBookModel");
const ReportType = require("@models/reportTypeModel");
const User = require("@models/userModel");
const messages = require("@constants/messages");
const sendMessageToSkyBookValidator = require("@validations/helpAndSupportRequest/sendMessageToSkyBookValidator");
const addReportTypeValidator = require("@validations/helpAndSupportRequest/addReportTypeValidator");

const sendMessageToSkyBookServiceFunc = async (req, res) => {
  try {
    const { errors, isValid } = sendMessageToSkyBookValidator(req.body);

    if (!isValid) {
      return res.json({
        status: 404,
        success: false,
        message: errors,
      });
    }

    let userFilter = { _id: req.body.userId };
    User.findOne(userFilter)
      .exec()
      .then((user) => {
        if (user) {
          let send = {
            _id: new mongoose.Types.ObjectId(),
            user: req.body.userId,
            message: req.body.message,
            reportType: req.body.reportType,
            attachment:
              req.files.attachment.length > 0
                ? req.files.attachment[0].location
                : null,
          };
          new SendMessageToSkyBook(send).save().then((send) => {
            res.json({
              success: true,
              message: messages.SUCCESS.HELPANDSUPPORT.MESSAGE.SENT,
              user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                mobileNo: user.mobileNo,
                userName: user.userName,
                dob: user.dob,
                role: user.role,
                accountType: user.accountType,
                profilePic: user.profilePic,
                coverPic: user.coverPic,
              },
              data: {
                id: send._id,
                message: send.message,
                attachment: send.attachment,
                createdAt: send.createdAt,
                updatedAt: send.updatedAt,
              },
            });
          });
        } else {
          res.json({
            status: 404,
            success: false,
            message: messages.FAILURE.USER_NOT_FOUND,
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

const getAllReportMessagesSentToSkyBookServiceFunc = async (req, res) => {
  try {
    console.log("req", req.body);
    SendMessageToSkyBook.find()
      .populate("user")
      .populate("reportType")
      .exec()
      .then((send) => {
        res.json({
          success: true,
          message: messages.SUCCESS.HELPANDSUPPORT.MESSAGE.FETCHED,
          data: send,
        });
      });
  } catch (err) {
    res.json({
      status: 500,
      success: false,
      message: err,
    });
  }
};

const addReportTypeServiceFunc = async (req, res) => {
  const { errors, isValid } = addReportTypeValidator(req.body);

  if (!isValid) {
    return res.json({
      status: 404,
      success: false,
      message: errors,
    });
  }
  console.log("req.body", req.body);

  let obj = {
    _id: new mongoose.Types.ObjectId(),
    data: req.body.data,
  };
  new ReportType(obj)
    .save()
    .then((result) => {
      console.log("result", result);
      res.json({
        success: true,
        message: messages.SUCCESS.HELPANDSUPPORT.REPORTTYPE.CREATED,
        data: {
          id: result._id,
          data: result.data,
        },
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        success: false,
        message: err.message ? err.message.message : "",
      });
    });
};

const changeReportTypeStatusServiceFunc = async (req, res) => {
  try {
    let fields = {};
    console.log("service jelper", req.body);

    fields.status = !req.body.status;

    console.log("service fields", fields);
    ReportType.findOneAndUpdate(
      { _id: req.body._id },
      { $set: fields },
      { new: true }
    ).then((innerPost) => {
      console.log("innerPost", innerPost);
      res.json({
        success: true,
        data: innerPost,
      });
    });
  } catch (err) {
    res.json({
      status: 500,
      success: false,
      message: err,
    });
  }
};

const getAllReportTypesServiceFunc = async (req, res) => {
  try {
    ReportType.find()
      .sort([["createdAt", -1]])
      .exec()
      .then((request) => {
        res.json({
          success: true,
          data: request,
        });
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
  sendMessageToSkyBookServiceFunc,
  addReportTypeServiceFunc,
  getAllReportMessagesSentToSkyBookServiceFunc,
  changeReportTypeStatusServiceFunc,
  getAllReportTypesServiceFunc,
};
