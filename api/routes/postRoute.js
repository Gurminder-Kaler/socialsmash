const express = require('express');
const router = express.Router();
const keys = require('@constants/keys');
const aws = require('aws-sdk');
const postController = require('@controllers/postController');
const multerS3 = require('multer-s3');
const multer = require('multer');
const config = {
    bucketName: keys.AWS.S3_BUCKET_NAME,
    dirName: 'posts/',
    region: 'eu-west-1',
    accessKeyId: keys.AWS.ACCESS_KEY_ID,
    secretAccessKey: keys.AWS.ACCESS_SECRET_KEY,
}
aws.config.update(config);

const s3 = new aws.S3();
var fields = [];
let p = { name: 'photos', maxCount: 5 };
let v = { name: 'video', maxCount: 1 };
fields.push(p);
fields.push(v);
var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: config.bucketName,
        key: function (req, file, cb) {
            cb(null, "posts/" + Date.now()+'_'+file.originalname); //use Date.now() for unique file keys

        }
    })
});
console.log('abc');
router.post('/savePost', upload.fields(fields),  postController.savePost);

router.post('/updatePost', postController.updatePost);

router.post('/getAllPostsViaUserId', postController.getAllPostsViaUserId);

router.get('/getAllPosts', postController.getAllPosts);

router.post('/getAllLikesOrDisLikesOnAPostViaPostId', postController.
getAllLikesOrDisLikesOnAPostViaPostId);

router.post('/getAPostViaId', postController.getAPostViaId);

router.post('/deletePost', postController.deletePost);

router.post('/saveComment', postController.saveComment);

router.post('/updateComment', postController.updateComment);

router.post('/deleteComment', postController.deleteComment);

router.post('/likePost', postController.likePost);

router.post('/disLikePost', postController.disLikePost);


module.exports = router;