const express = require("express");
const router = express.Router();
const helpAndSupportController = require("@controllers/helpAndSupportController");
const keys = require("@constants/keys");
const aws = require("aws-sdk");
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
const fields = [{ name: "attachment", maxCount: 1 }];
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
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.bucketName,
    key: function (req, file, cb) {
      console.log("file/////////////", req.body);
      let path = "sendMessageToSkyBook/";
      cb(null, path + Date.now() + "_" + file.originalname); //use Date.now() for unique file keys
    },
  }),
  limits: {
    filesize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});
router.post(
  "/sendMessageToSkyBook",
  upload.fields(fields),
  helpAndSupportController.sendMessageToSkyBook
);

router.get(
  "/getAllReportMessagesSentToSkyBook",
  helpAndSupportController.getAllReportMessagesSentToSkyBook
);

router.post(
  "/changeReportTypeStatus",
  helpAndSupportController.changeReportTypeStatus
);

router.get("/getAllReportTypes", helpAndSupportController.getAllReportTypes);

router.post("/addReportType", helpAndSupportController.addReportType);

router.post(
  "/changeReportTypeStatus",
  helpAndSupportController.changeReportTypeStatus
);

module.exports = router;
