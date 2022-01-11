const {
  updatePasswordServiceFunc,
  getDashboardCountServiceFunc,
} = require("@services/settingService");

//@private
//@usage : logged in user will update the password
exports.updatePassword = async (req, res) => {
  try {
    console.log("req.body", req.body);
    return await updatePasswordServiceFunc(req, res);
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err,
    });
  }
};

//@private
//@usage : admin Panel Dashboard Count
exports.getDashboardCount = async (req, res) => {
  try {
    console.log("req.body", req.body);
    return await getDashboardCountServiceFunc(req, res);
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err,
    });
  }
};
