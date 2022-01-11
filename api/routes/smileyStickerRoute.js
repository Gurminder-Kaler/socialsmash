const express = require("express");
const router = express.Router();
const aws = require("aws-sdk");
const keys = require("@constants/keys");
const smileyStickerController = require("@controllers/smileyStickerController");
const checkAuth = require("@middlewares/checkAuth");
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
const fields = [{ name: "icon", maxCount: 40 }];
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
      let path = "smileySticker/";
      cb(null, path + Date.now() + "_" + file.originalname); //use Date.now() for unique file keys
    },
  }),
  limits: {
    filesize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.post(
  "/addSmileySticker",
  upload.fields(fields),
  smileyStickerController.addSmileySticker
);

router.get(
  "/getAllSmileySticker/:type",
  smileyStickerController.getAllSmileySticker
);

module.exports = router;
