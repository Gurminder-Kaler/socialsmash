const {
  searchPeopleServiceFunc,
  searchCompanyServiceFunc,
} = require("@services/searchService");

//@private
//@usage : search at the top  | search name, status etc for the people. User Table will be hit.
exports.searchPeople = async (req, res) => {
  try {
    return await searchPeopleServiceFunc(req, res);
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err,
    });
  }
};

//@private
//@usage : search at the top  | search name, status etc for the people. Company Table will be hit.
exports.searchCompany = async (req, res) => {
  try {
    return await searchCompanyServiceFunc(req, res);
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err,
    });
  }
};
