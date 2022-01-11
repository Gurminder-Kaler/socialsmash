const mongoose = require("mongoose");
const FriendRequest = require("@models/friendRequestModel");
const CompanyCategory = require("@models/companyCategoryModel");
const CompanyFollow = require("@models/companyFollowModel");
const CompanyReview = require("@models/companyReviewModel");
const Company = require("@models/companyModel");
const messages = require("@constants/messages");
const addCompanyCategoryValidator = require("@validations/companyRequest/addCompanyCategoryValidator");
const addCompanyValidator = require("@validations/companyRequest/addCompanyValidator");
// const addReviewCompanyValidator = require("@validations/companyRequest/addReviewCompanyValidator");
const isEmpty = require("@validations/is-empty");

const addCompanyReviewServiceFunc = async (req, res) => {
  try {
    // const { errors, isValid } = addReviewCompanyValidator(req.body);

    // if (!isValid) {
    //   return res.json({
    //     status: 400,
    //     success: false,
    //     message: errors,
    //   });
    // }
    console.log("req", req.body);
    let data = {
      _id: new mongoose.Types.ObjectId(),
      review: req.body.review,
      rating: req.body.rating,
    };
    console.log("data", data);
    new CompanyReview(data).save().then((result) => {
      res.json({
        success: true,
        message: messages.SUCCESS.COMPANY.REVIEWED,
        data: {
          id: result._id,
          rating: result.rating,
          review: result.review,
          createdAt: result.createdAt,
          updatedAt: result.updatedAt,
        },
      });
    });
  } catch (err) {
    res.json({
      status: 500,
      success: false,
      message: "err",
    });
  }
};

const getAllCompanyCategoriesViaParentIdServiceFunc = async (req, res) => {
  try {
    console.log("gold req.body", req.body);
    CompanyCategory.find({ parent: req.body.parentId }).then((result) => {
      if (result) {
        res.json({
          status: 201,
          message: messages.SUCCESS.COMPANY.CATEGORY.FETCHED,
          data: result,
          success: true,
        });
      } else {
        res.json({
          status: 401,
          success: false,
          message: messages.FAILURE.SWW,
        });
      }
    });
  } catch (err) {
    res.json({
      status: 500,
      success: false,
      message: "err",
    });
  }
};

const updateCompanyServiceFunc = async (req, res) => {
  try {
    // const { errors, isValid } = addReviewCompanyValidator(req.body);

    // if (!isValid) {
    //   return res.json({
    //     status: 400,
    //     success: false,
    //     message: errors,
    //   });
    // }
    let fields = {
      name: req.body.name,
      about: req.body.about,
      image:
        req.files && req.files.image && req.files.image.length > 0
          ? req.files.image[0].location
          : null,
      coverImage:
        req.files && req.files.coverImage && req.files.coverImage.length > 0
          ? req.files.coverImage[0].location
          : null,
      category: req.body.category,
      createdBy: req.body.userId,
    };
    Company.findOneAndUpdate(
      { _id: req.body.companyId },
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
    });
  } catch (err) {
    res.json({
      status: 500,
      success: false,
      message: "err",
    });
  }
};

const addCompanyServiceFunc = async (req, res) => {
  try {
    const { errors, isValid } = addCompanyValidator(req.body);

    if (!isValid) {
      return res.json({
        status: 400,
        success: false,
        message: errors,
      });
    }
    console.log("req", req.body);
    let data = {
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      about: req.body.about,
      image:
        req.files && req.files.image && req.files.image.length > 0
          ? req.files.image[0].location
          : null,
      coverImage:
        req.files && req.files.coverImage && req.files.coverImage.length > 0
          ? req.files.coverImage[0].location
          : null,
      category: req.body.category,
      createdBy: req.body.userId,
    };
    console.log("data", data);
    new Company(data).save().then((result) => {
      res.json({
        success: true,
        message: messages.SUCCESS.COMPANY.CREATED,
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
    });
  } catch (err) {
    res.json({
      status: 500,
      success: false,
      message: "err",
    });
  }
};

const changeCompanyStatusServiceFunc = async (req, res) => {
  try {
    let fields = {};
    console.log("service jelper", req.body);

    fields.status = req.body.status;

    console.log("service fields", fields);
    Company.findOneAndUpdate(
      { _id: req.body._id },
      { $set: fields },
      { new: true }
    ).then((inner) => {
      console.log("inner", inner);
      res.json({
        success: true,
        data: inner,
      });
    });
  } catch (err) {
    res.json({
      status: 500,
      success: false,
      message: "err",
    });
  }
};

const getAllCompanyParentCategoriesServiceFunc = async (req, res) => {
  try {
    CompanyCategory.find({ parent: null })
      // .sort([["createdAt", -1]])
      .then((result) => {
        if (result) {
          res.json({
            status: 201,
            success: true,
            message: messages.SUCCESS.COMPANY.CATEGORY.FETCHED,
            data: result,
          });
        } else {
          res.json({
            status: 401,
            success: false,
            message: messages.FAILURE.SWW,
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

const getCompaniesViaUserIdServiceFunc = async (req, res) => {
  try {
    console.log("req", req.body);
    Company.find({ createdBy: mongoose.Types.ObjectId(req.body.userId) })
      .populate("createdBy", ["firstName", "lastName", "email"])
      .populate("category")
      .sort([["createdAt", -1]])
      .then((result) => {
        console.log("result gurminder", result);
        if (result) {
          res.json({
            status: 201,
            success: true,
            message: messages.SUCCESS.COMPANY.FETCHED,
            data: result,
          });
        } else {
          res.json({
            status: 401,
            success: false,
            message: messages.FAILURE.SWW,
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

const getAllCompaniesServiceFunc = async (req, res) => {
  try {
    Company.find()
      .populate("createdBy", ["firstName", "lastName", "email"])
      .populate("category")
      .sort([["createdAt", -1]])
      .then((result) => {
        console.log("result gurminder", result);
        if (result) {
          res.json({
            status: 201,
            success: true,
            message: messages.SUCCESS.COMPANY.FETCHED,
            data: result,
          });
        } else {
          res.json({
            status: 401,
            success: false,
            message: messages.FAILURE.SWW,
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

const getAllCompanyCategoriesServiceFunc = async (req, res) => {
  try {
    CompanyCategory.find()
      .sort([["createdAt", -1]])
      .then((result) => {
        if (result) {
          res.json({
            status: 201,
            success: true,
            message: messages.SUCCESS.COMPANY.CATEGORY.FETCHED,
            data: result,
          });
        } else {
          res.json({
            status: 401,
            success: false,
            message: messages.FAILURE.SWW,
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

const addCompanyCategoryServiceFunc = async (req, res) => {
  try {
    console.log("req", req.body);
    const { errors, isValid } = addCompanyCategoryValidator(req.body);

    if (!isValid) {
      return res.json({
        status: 400,
        success: false,
        message: errors,
      });
    }
    let allCats = await CompanyCategory.find({ category: req.body.category })
      .lean()
      .exec();
    if (allCats.length > 0) {
      return res.json({
        status: 404,
        success: false,
        message: messages.FAILURE.COMPANY_CATEGORY_ALREADY_TAKEN,
      });
    }
    let data = {};
    if (isEmpty(req.body.parent)) {
      data = {
        _id: new mongoose.Types.ObjectId(),
        category: req.body.category,
        image: req.files.image[0].location,
      };
    } else {
      data = {
        _id: new mongoose.Types.ObjectId(),
        category: req.body.category,
        parent: req.body.parent,
      };
    }

    new CompanyCategory(data).save().then((result) => {
      res.json({
        success: true,
        message: messages.SUCCESS.COMPANY.CATEGORY.CREATED,
        data: {
          id: result._id,
          category: result._category,
          parent: result.parent,
          createdAt: result.createdAt,
          updatedAt: result.updatedAt,
        },
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

const followUnFollowCompanyServiceFunc = async (req, res) => {
  try {
    let exist = await CompanyFollow.find(
      { user: req.body.userId },
      { company: req.body.companyId }
    )
      .lean()
      .exec();
    console.log("exist", exist);
    if (exist.length > 0) {
      CompanyFollow.findByIdAndDelete(exist[0]._id).then((result) => {
        return res.json({
          status: 200,
          success: true,
          message: messages.SUCCESS.COMPANY.UNFOLLOWED,
        });
      });
    } else {
      let data = {
        _id: new mongoose.Types.ObjectId(),
        company: req.body.companyId,
        user: req.body.userId,
      };
      new CompanyFollow(data).save().then((result) => {
        return res.json({
          status: 200,
          success: true,
          message: messages.SUCCESS.COMPANY.FOLLOWED,
        });
      });
    }
  } catch (err) {
    res.json({
      status: 500,
      success: false,
      message: err,
    });
  }
};

module.exports = {
  getAllCompanyParentCategoriesServiceFunc,
  getAllCompaniesServiceFunc,
  getAllCompanyCategoriesServiceFunc,
  addCompanyCategoryServiceFunc,
  addCompanyServiceFunc,
  changeCompanyStatusServiceFunc,
  getCompaniesViaUserIdServiceFunc,
  followUnFollowCompanyServiceFunc,
  addCompanyReviewServiceFunc,
  updateCompanyServiceFunc,
  getAllCompanyCategoriesViaParentIdServiceFunc,
};
