const {
  sendMessageToSkyBookServiceFunc,
  getAllReportMessagesSentToSkyBookServiceFunc,
  getAllReportTypesServiceFunc,
  changeReportTypeStatusServiceFunc,
  addReportTypeServiceFunc,
} = require("@services/helpAndSupportService");

//@private
//@usage send the message to SkyBook.
exports.sendMessageToSkyBook = async (req, res) => {
  try {
    return await sendMessageToSkyBookServiceFunc(req, res);
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err,
    });
  }
};

//@private
//@usage send the message to SkyBook.
exports.changeReportTypeStatus = async (req, res) => {
  try {
    return await changeReportTypeStatusServiceFunc(req, res);
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err,
    });
  }
};

//@private
//@usage get all messages sent to SkyBook
exports.getAllReportMessagesSentToSkyBook = async (req, res) => {
  try {
    return await getAllReportMessagesSentToSkyBookServiceFunc(req, res);
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err,
    });
  }
};

//@private
//@usage get all report types
exports.getAllReportTypes = async (req, res) => {
  try {
    return await getAllReportTypesServiceFunc(req, res);
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err,
    });
  }
};

//@private
//@usage add report
exports.addReportType = async (req, res) => {
  try {
    return await addReportTypeServiceFunc(req, res);
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err,
    });
  }
};
