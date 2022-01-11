const {
  getAllCompanyParentCategoriesServiceFunc,
  getAllCompanyCategoriesServiceFunc,
  getAllCompanyCategoriesViaParentIdServiceFunc,
  addCompanyCategoryServiceFunc,
  addCompanyServiceFunc,
  getAllCompaniesServiceFunc,
  changeCompanyStatusServiceFunc,
  getCompaniesViaUserIdServiceFunc,
  followUnFollowCompanyServiceFunc,
  reviewCompanyServiceFunc,
  addCompanyReviewServiceFunc,
  updateCompanyServiceFunc,
} = require("@services/companyService");

//@private
//@usage : follow and unfollow a company
exports.followUnFollowCompany = async (req, res) => {
  try {
    console.log("req", req.body);
    var result = await followUnFollowCompanyServiceFunc(req, res);
    return result;
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err && err.message ? err.message : "",
    });
  }
};

//@private
//@usage : add review of the company
exports.addCompanyReview = async (req, res) => {
  try {
    console.log("req", req.body);
    var result = await addCompanyReviewServiceFunc(req, res);
    return result;
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err && err.message ? err.message : "",
    });
  }
};

//@private
//@usage : review a company
exports.reviewCompany = async (req, res) => {
  try {
    console.log("req", req.body);
    var result = await reviewCompanyServiceFunc(req, res);
    return result;
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err && err.message ? err.message : "",
    });
  }
};
//@private
//@usage : add a company
exports.addCompany = async (req, res) => {
  try {
    console.log("req", req.body);
    var result = await addCompanyServiceFunc(req, res);
    return result;
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err && err.message ? err.message : "",
    });
  }
};
//@private
//@usage : update a company
exports.updateCompany = async (req, res) => {
  try {
    console.log("req", req.body);
    var result = await updateCompanyServiceFunc(req, res);
    return result;
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err && err.message ? err.message : "",
    });
  }
};

//@private
//@usage : changeCompanyStatus
exports.changeCompanyStatus = async (req, res) => {
  try {
    console.log("req", req.body);
    var result = await changeCompanyStatusServiceFunc(req, res);
    return result;
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err && err.message ? err.message : "",
    });
  }
};

//@private
//@usage : get All Companies
exports.getAllCompanies = async (req, res) => {
  try {
    console.log("req", req.body);
    var result = await getAllCompaniesServiceFunc(req, res);
    return result;
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err && err.message ? err.message : "",
    });
  }
};

//@private
//@usage : get All Companies Via UserId
exports.getCompaniesViaUserId = async (req, res) => {
  try {
    console.log("req", req.body);
    var result = await getCompaniesViaUserIdServiceFunc(req, res);
    return result;
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err && err.message ? err.message : "",
    });
  }
};

//@private
//@usage : get All Companies Via ParentId
exports.getAllCompanyCategoriesViaParentId = async (req, res) => {
  try {
    console.log("req", req.body);
    var result = await getAllCompanyCategoriesViaParentIdServiceFunc(req, res);
    return result;
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err && err.message ? err.message : "",
    });
  }
};

//@private
//@usage : get all parent company categories.
exports.getAllCompanyParentCategories = async (req, res) => {
  try {
    var result = await getAllCompanyParentCategoriesServiceFunc(req, res);
    return result;
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err && err.message ? err.message : "",
    });
  }
};

//@private
//@usage : get all company categories.
exports.getAllCompanyCategories = async (req, res) => {
  try {
    var result = await getAllCompanyCategoriesServiceFunc(req, res);
    return result;
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err && err.message ? err.message : "",
    });
  }
};

//@private
//@usage : add company category
exports.addCompanyCategory = async (req, res) => {
  try {
    var result = await addCompanyCategoryServiceFunc(req, res);
    return result;
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err && err.message ? err.message : "",
    });
  }
};
