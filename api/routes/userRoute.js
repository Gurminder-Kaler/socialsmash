const express = require('express');
const router = express.Router();
const userController = require('@controllers/userController');
const checkAuthMiddleware = require('@middlewares/checkAuth');
const checkAdminMiddleware = require('@middlewares/checkAdmin');
const checkCustomer = require('@middlewares/checkCustomer');
const keys = require('@constants/keys');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const checkAuth = require('@middlewares/checkAuth');
const config = {
    bucketName: keys.AWS.S3_BUCKET_NAME,
    dirName: 'posts',
    region: 'eu-west-1',
    accessKeyId: keys.AWS.ACCESS_KEY_ID,
    secretAccessKey: keys.AWS.ACCESS_SECRET_KEY,
}
aws.config.update(config);
const s3 = new aws.S3();
const fields = [
  { name: 'coverPic', maxCount: 1 },
  { name: 'profilePic', maxCount: 1 }
];

const fileFilter = (req, file, cb) => {
  if(
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/JPEG' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/JPG' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/PNG'
  )
  {
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
            cb(null, Date.now()+'_'+file.originalname); //use Date.now() for unique file keys
        }
    }),
    limits: {
      filesize: 1024 * 1024 * 5
    },
  fileFilter: fileFilter
});

// router.get('/', userController.getAllUsers);
// // checkAuthMiddleware, checkAdminMiddleware

// router.post('/', userController.getUserViaId);
// //checkAuthMiddleware

router.post('/signUp', userController.signUp);  

router.post('/signIn', userController.signIn);

router.post('/profile/update', userController.updateProfile); 

module.exports = router;