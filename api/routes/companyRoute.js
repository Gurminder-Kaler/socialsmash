const express = require("express");
const router = express.Router();
const companyController = require("@controllers/companyController");
const checkAuth = require("@middlewares/checkAuth");
const aws = require("aws-sdk");
const keys = require("@constants/keys");
const multer = require("multer");
const multerS3 = require("multer-s3");
const config = {
  bucketName: keys.AWS.S3_BUCKET_NAME,
  dirName: "posts",
  region: "eu-west-1",
  accessKeyId: keys.AWS.ACCESS_KEY_ID,
  secretAccessKey: keys.AWS.ACCESS_SECRET_KEY,
};
aws.config.update(config);
const s3 = new aws.S3();
const fields = [{ name: "image", maxCount: 1 }];
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/JPEG" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/JPG" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/PNG"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const companyImageFields = [
  { name: "image", maxCount: 1 },
  { name: "coverImage", maxCount: 1 },
];
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.bucketName,
    key: function (req, file, cb) {
      console.log("file/////////////", req.body);
      let path = "companyCategory/";
      cb(null, path + Date.now() + "_" + file.originalname); //use Date.now() for unique file keys
    },
  }),
  limits: {
    filesize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

var uploadCompanyImages = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.bucketName,
    key: function (req, file, cb) {
      console.log("file/////////////", req.body);
      let path = "company/";
      cb(null, path + Date.now() + "_" + file.originalname); //use Date.now() for unique file keys
    },
  }),
  limits: {
    filesize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.post(
  "/addCompany",
  uploadCompanyImages.fields(companyImageFields),
  companyController.addCompany
);

router.post(
  "/updateCompany",
  uploadCompanyImages.fields(companyImageFields),
  companyController.updateCompany
);

router.post("/addCompanyReview", companyController.addCompanyReview);

router.post("/followUnFollowCompany", companyController.followUnFollowCompany);

router.post("/changeCompanyStatus", companyController.changeCompanyStatus);

router.post(
  "/addCompanyCategory",
  upload.fields(fields),
  companyController.addCompanyCategory
);

router.post("/getAllCompanies", companyController.getAllCompanies);

router.post(
  "/getAllCompanyParentCategories",
  companyController.getAllCompanyParentCategories
);

router.post(
  "/getAllCompanyCategoriesViaParentId",
  companyController.getAllCompanyCategoriesViaParentId
);

router.post("/getCompaniesViaUserId", companyController.getCompaniesViaUserId);

router.post(
  "/getAllCompanyCategories",
  companyController.getAllCompanyCategories
);

module.exports = router;
