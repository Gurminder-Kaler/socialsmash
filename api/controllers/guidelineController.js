const {
  getGuidelineServiceFunc,
  updateGuidelineServiceFunc
} = require('@services/guidelineService')

//@private
//@usage get the guidelines from the database.
exports.getGuideline = async (req, res) => {
  try {
    return await getGuidelineServiceFunc(req, res)
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err
    })
  }
}

//@private
//@usage update the guidelines in the database.
exports.updateGuideline = async (req, res) => {
  try {
    return await updateGuidelineServiceFunc(req, res)
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err
    })
  }
}
