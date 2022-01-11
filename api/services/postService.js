const mongoose = require('mongoose')
//models
const User = require('@models/userModel')
const Comment = require('@models/commentModel')
const Post = require('@models/postModel')
const LikeDisLike = require('@models/likeDisLikeModel')
const FriendRequest = require('@models/friendRequestModel')
//end models
const messages = require('@constants/messages')
const likeDisLikeAPostValidator = require('@validations/likeDisLikeRequest/likeDisLikeAPostValidator')
const getAllLikesOrDisLikesOnAPostViaPostIdValidator = require('@validations/likeDisLikeRequest/getAllLikesOrDisLikesOnAPostViaPostIdValidator')
const savePostValidator = require('@validations/postRequest/savePostValidator')
const updatePostValidator = require('@validations/postRequest/updatePostValidator')
const deletePostValidator = require('@validations/postRequest/deletePostValidator')
const getAllPostsValidator = require('@validations/postRequest/getAllPostsValidator')
const getPostViaIdValidator = require('@validations/postRequest/getPostViaIdValidator')
const commentSaveValidator = require('@validations/commentRequest/commentSaveValidator')
const commentUpdateValidator = require('@validations/commentRequest/commentUpdateValidator')
const commentDeleteValidator = require('@validations/commentRequest/commentDeleteValidator')

////////////////////POST FUNCTIONS START///////////////////////
//save post
const savePostServiceFunc = async (req, res) => {
  const { errors, isValid } = savePostValidator(req.body)

  if (!isValid) {
    return res.json({
      status: 404,
      success: false,
      message: errors
    })
  }
  console.log('req.body', req.body)
  // Get fields
  const postFields = {}
  let photos = []
  let video = [] //

  if (req.body.post) {
    postFields.post = req.body.post
    postFields.typeOfPost = req.body.typeOfPost
    if (postFields.typeOfPost == 'company_post') {
      postFields.companyId = req.body.companyId ? req.body.companyId : null
    }
  }
  if (req.files && Object.keys(req.files).length > 0) {
    if (req.files.photos && req.files.photos.length > 0) {
      console.log('p')

      for (let i = 0; i < req.files.photos.length; i++) {
        photos.push(req.files.photos[i].location)
      }
    }
    if (req.files.video && req.files.video.length > 0) {
      if (req.files.video[0]) {
        video.push(req.files.video[0].location)
      }
    }
  }
  postFields.user = req.body.userId
  let userFilter = { _id: req.body.userId }
  User.findOne(userFilter)
    .exec()
    .then(user => {
      if (user) {
        let post = {
          _id: new mongoose.Types.ObjectId(),
          user: postFields.user,
          typeOfPost: postFields.typeOfPost,
          post: postFields.post,
          companyId: postFields.companyId,
          photos: photos,
          video: video
        }

        console.log('abc', post)
        new Post(post).save().then(innerPost => {
          res.json({
            success: true,
            message: messages.SUCCESS.POST.UPDATED,
            user: {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              mobileNo: user.mobileNo,
              userName: user.userName,
              dob: user.dob,
              role: user.role,
              accountType: user.accountType,
              profilePic: user.profilePic,
              coverPic: user.coverPic
            },
            data: {
              id: innerPost._id,
              post: innerPost.post,
              companyId: innerPost.companyId,
              photos: innerPost.photos,
              video: innerPost.video,
              createdAt: innerPost.createdAt,
              updatedAt: innerPost.updatedAt
            }
          })
        })
      } else {
        res.json({
          status: 404,
          success: false,
          message: messages.FAILURE.USER_NOT_FOUND
        })
      }
    })
    .catch(err => {
      res.json({
        status: 500,
        success: false,
        message: err
      })
    })
}

//update post
const updatePostServiceFunc = async (req, res) => {
  console.log('req.body', req.body)
  const { errors, isValid } = updatePostValidator(req.body)

  if (!isValid) {
    return res.json({
      status: 404,
      success: false,
      message: errors
    })
  }
  // Get fields
  const postFields = {}

  if (req.body.post) {
    postFields.post = req.body.post
  }

  Post.findOne({ _id: req.body.postId })
    .select('*')
    .exec()
    .then(post => {
      if (post) {
        // Update
        Post.findOneAndUpdate(
          { _id: req.body.postId },
          { $set: postFields },
          { new: true }
        ).then(innerPost => {
          res.json({
            success: true,
            status: 200,
            message: messages.SUCCESS.POST.UPDATED,
            data: {
              id: innerPost._id,
              data: innerPost.data,
              createdAt: innerPost.createdAt,
              updatedAt: innerPost.updatedAt
            }
          })
        })
      } else {
        res.json({
          success: false,
          message: messages.FAILURE.POST_NOT_FOUND,
          status: 404
        })
      }
    })
    .catch(err => {
      res.json({
        status: 500,
        success: false,
        message: err
      })
    })
}

//delete post
const deletePostServiceFunc = async (req, res) => {
  const { errors, isValid } = deletePostValidator(req.body)
  if (!isValid) {
    return res.json({
      status: 404,
      success: false,
      message: errors
    })
  }
  console.log('asds')
  let post = await Post.findOne({ _id: req.body.postId })
    .lean()
    .exec()
  console.log('post', post)
  if (!post) {
    return res.json({
      status: 404,
      success: false,
      message: messages.FAILURE.POST_NOT_FOUND
    })
  }
  // Get fields
  const postFields = {}

  if (req.body.postId) {
    postFields.postId = req.body.postId
  }
  Post.findByIdAndDelete(req.body.postId)
    .then(post => {
      res.json({
        status: 200,
        success: true,
        message: messages.SUCCESS.POST.DELETED
      })
    })
    .catch(err => {
      res.json({
        status: 500,
        success: false,
        message: err && err.message ? err.message : ''
      })
    })
}

//below is timeline api.
const getAllPostsViaUserIdServiceFunc = async (req, res) => {
  const { errors, isValid } = getAllPostsValidator(req.body)

  if (!isValid) {
    return res.json({
      status: 404,
      success: false,
      message: errors
    })
  }
  const userId = req.body.userId

  const filter = {
    user: userId
  }

  const userFilter = {
    _id: userId
  }

  const user = await User.findOne(userFilter)
    .lean()
    .exec()
  if (!user) {
    res.json({
      status: 404,
      success: false,
      message: messages.FAILURE.USER_NOT_FOUND
    })
  }

  let friendsUserIds = []

  let sentAcceptedRequests = await FriendRequest.find({
    status: 'accepted',
    sender: mongoose.Types.ObjectId(userId)
  })
    .lean()
    .exec()

  let receivedAcceptedRequests = await FriendRequest.find({
    status: 'accepted',
    receiver: mongoose.Types.ObjectId(userId)
  })
    .lean()
    .exec()

  for (let i = 0; i < sentAcceptedRequests.length; i++) {
    friendsUserIds.push(sentAcceptedRequests[i].receiver)
  }
  for (let i = 0; i < receivedAcceptedRequests.length; i++) {
    friendsUserIds.push(receivedAcceptedRequests[i].sender)
  }

  let myFriends = await User.find({ _id: { $in: friendsUserIds } })
    .lean()
    .exec()

  let allPosts = await Post.find(filter)
    .lean()
    .exec()

  for (let i = 0; i < allPosts.length; i++) {
    let likedUserCount = 0
    let disLikedUserCount = 0
    let ld = await LikeDisLike.find({
      post: allPosts[i]._id,
      $and: [
        {
          $or: [{ status: 'liked' }, { status: 'disliked' }]
        }
      ]
    }).exec()
    if (ld.length > 0) {
      ld.map(bothRow => {
        if (bothRow.status == 'liked') {
          likedUserCount += 1
        }
        if (bothRow.status == 'disliked') {
          disLikedUserCount += 1
        }
      })
    }
    allPosts[i]['likeCount'] = likedUserCount
    allPosts[i]['disLikeCount'] = disLikedUserCount
  }

  let Spec = {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    mobileNo: user.mobileNo,
    userName: user.userName,
    dob: user.dob,
    role: user.role,
    accountType: user.accountType
  }

  if (user.profession) {
    Spec.profession = user.profession
    Spec.showProfessionOnTimeline = user.showProfessionOnTimeline
  }

  if (user.location) {
    Spec.location = user.location
    Spec.showCityNameOnTimeline = user.showCityNameOnTimeline
  }

  if (myFriends.length > 0) {
    Spec.friendsCount = myFriends.length
    Spec.showFriendsOnTimeline = user.showFriendsOnTimeline
  }

  let location = res.json({
    success: true,
    status: 200,
    message: messages.SUCCESS.POST.FETCHED,
    count: allPosts.length,
    user: Spec,
    data: allPosts
  })
}

//below is api for getting all posts
const getAllPostsServiceFunc = async (req, res) => {
  let allPosts = await Post.find()
    .lean()
    .exec()
  if (allPosts.length < 1) {
    res.json({
      status: 200,
      success: true,
      message: messages.FAILURE.POST_NOT_FOUND
    })
  }
  for (let i = 0; i < allPosts.length; i++) {
    let likedUserCount = 0
    let disLikedUserCount = 0
    let ld = await LikeDisLike.find({
      post: allPosts[i]._id,
      $and: [
        {
          $or: [{ status: 'liked' }, { status: 'disliked' }]
        }
      ]
    }).exec()
    if (ld.length > 0) {
      ld.map(bothRow => {
        if (bothRow.status == 'liked') {
          likedUserCount += 1
        }
        if (bothRow.status == 'disliked') {
          disLikedUserCount += 1
        }
      })
    }
    allPosts[i]['likeCount'] = likedUserCount
    allPosts[i]['disLikeCount'] = disLikedUserCount
  }
  res.json({
    success: true,
    status: 200,
    message: messages.SUCCESS.POST.FETCHED,
    count: allPosts.length,
    data: allPosts
  })
}

//get a post via id
const getAPostViaIdServiceFunc = async (req, res) => {
  const { errors, isValid } = getPostViaIdValidator(req.body)

  if (!isValid) {
    return res.json({
      status: 404,
      success: false,
      message: errors
    })
  }
  const filter = {
    _id: req.body.postId
  }
  Post.findOne(filter)
    .populate('user')
    .exec()
    .then(post => {
      if (post) {
        LikeDisLike.find({ post: post._id, status: 'liked' })
          .populate('user', ['-password', '-otp'])
          .exec(function (err, likedRows) {
            var likedUser = []
            likedRows.map(likedRow => {
              likedUser.push(likedRow.user)
            })
            LikeDisLike.find({ post: post._id, status: 'disliked' }).exec(
              function (err, dislikedRows) {
                var disLikedUser = []
                dislikedRows.map(disLikedRow => {
                  disLikedUser.push(disLikedRow.user)
                })
                res.json({
                  status: 200,
                  success: true,
                  message: messages.SUCCESS.POST.FETCHED,
                  user: {
                    id: post.user._id,
                    firstName: post.user.firstName,
                    lastName: post.user.lastName,
                    email: post.user.email,
                    mobileNo: post.user.mobileNo,
                    userName: post.user.userName,
                    dob: post.user.dob,
                    role: post.user.role,
                    accountType: post.user.accountType
                  },
                  post: {
                    id: post._id,
                    post: post.post,
                    likeCount: likedRows.length,
                    likeUsers: likedUser,
                    dislikeCount: dislikedRows.length,
                    disLikeUsers: disLikedUser,
                    photos: post.photos,
                    video: post.video,
                    createdAt: post.createdAt,
                    updatedAt: post.updatedAt
                  }
                })
              }
            )
          })
      } else {
        res.json({
          status: 404,
          success: false,
          message: messages.FAILURE.POST_NOT_FOUND
        })
      }
    })
    .catch(err => {
      res.json({
        status: 500,
        success: false,
        message: err
      })
    })
}
////////////////////END POST FUNCTIONS///////////////////////

////////////////////LIKE FUNCTIONS START/////////////////////
// like a post
const likePostServiceFunc = async (req, res) => {
  const { errors, isValid } = likeDisLikeAPostValidator(req.body)

  if (!isValid) {
    return res.json({
      status: 404,
      success: false,
      message: errors
    })
  }
  // Get fields
  const likeFields = {}

  likeFields.post = req.body.postId
  likeFields.user = req.body.userId
  //contains values liked and unlike.

  LikeDisLike.findOne({ post: req.body.postId, user: req.body.userId })
    .exec()
    .then(result => {
      if (result) {
        // Update
        if (result.status == 'liked') {
          likeFields.status = 'pending'
        } else if (result.status == 'pending' || result.status == 'disliked') {
          likeFields.status = 'liked'
        }

        LikeDisLike.findOneAndUpdate(
          {
            post: req.body.postId,
            user: req.body.userId
          },
          { $set: likeFields },
          { new: true }
        ).then(innerResult => {
          res.json({
            success: true,
            message:
              result.status == 'pending' || result.status == 'disliked'
                ? messages.SUCCESS.POST.LIKED
                : messages.SUCCESS.POST.PENDING,
            data: {
              id: innerResult._id,
              user: innerResult.user,
              post: innerResult.post,
              status: innerResult.status,
              createdAt: innerResult.createdAt,
              updatedAt: innerResult.updatedAt
            }
          })
        })
      } else {
        // Create
        // console.log('req.body', req.body);
        new LikeDisLike({
          _id: new mongoose.Types.ObjectId(),
          user: req.body.userId,
          post: req.body.postId,
          status: 'liked'
        })
          .save()
          .then(innerPost => {
            console.log('innerPost', innerPost)
            res.json({
              success: true,
              message: messages.SUCCESS.POST.UPDATED,
              data: {
                id: innerPost._id,
                post: innerPost.post,
                createdAt: innerPost.createdAt,
                updatedAt: innerPost.updatedAt
              }
            })
          })
      }
    })
    .catch(err => {
      res.json({
        status: 500,
        success: false,
        message: err
      })
    })
}

//dislike a post
const disLikePostServiceFunc = async (req, res) => {
  const { errors, isValid } = likeDisLikeAPostValidator(req.body)

  if (!isValid) {
    return res.json({
      status: 404,
      success: false,
      message: errors
    })
  }
  // Get fields
  const disLikeFields = {}

  disLikeFields.post = req.body.postId
  disLikeFields.user = req.body.userId
  //contains values liked and unlike.

  LikeDisLike.findOne({ post: req.body.postId, user: req.body.userId })
    .exec()
    .then(result => {
      if (result) {
        // Update

        if (result.status == 'disliked') {
          disLikeFields.status = 'pending'
        } else if (result.status == 'pending' || result.status == 'liked') {
          disLikeFields.status = 'disliked'
        }
        // likeUnlikeFields.updatedAt = time();

        LikeDisLike.findOneAndUpdate(
          {
            post: req.body.postId,
            user: req.body.userId
          },
          { $set: disLikeFields },
          { new: true }
        ).then(innerResult => {
          res.json({
            success: true,
            message:
              result.status == 'pending' || result.status == 'liked'
                ? messages.SUCCESS.POST.DISLIKED
                : messages.SUCCESS.POST.PENDING,
            data: {
              id: innerResult._id,
              user: innerResult.user,
              post: innerResult.post,
              status: innerResult.status,
              createdAt: innerResult.createdAt,
              updatedAt: innerResult.updatedAt
            }
          })
        })
      } else {
        // Create
        // console.log('req.body', req.body);
        new LikeDisLike({
          _id: new mongoose.Types.ObjectId(),
          user: req.body.userId,
          post: req.body.postId,
          status: 'disliked'
        })
          .save()
          .then(innerPost => {
            console.log('innerPost', innerPost)
            res.json({
              success: true,
              message: messages.SUCCESS.POST.UPDATED,
              data: {
                id: innerPost._id,
                post: innerPost.post,
                createdAt: innerPost.createdAt,
                updatedAt: innerPost.updatedAt
              }
            })
          })
      }
    })
    .catch(err => {
      res.json({
        status: 500,
        success: false,
        message: err
      })
    })
}

// get all likes and dislikes on a post
const getAllLikesOrDisLikesOnAPostViaPostIdServiceFunc = async (req, res) => {
  const { errors, isValid } = getAllLikesOrDisLikesOnAPostViaPostIdValidator(
    req.body
  )

  if (!isValid) {
    return res.json({
      status: 404,
      success: false,
      message: errors
    })
  }
  const filter = {
    post: req.body.postId,
    status: req.body.type
  }
  let totalLikesOrDisLikes = await LikeDisLike.find(filter)
    .populate('user', '_id email firstName lastName')
    .lean()
    .exec() //get all liked likes
  if (totalLikesOrDisLikes.length > 0) {
    res.json({
      status: 200,
      success: true,
      message: messages.SUCCESS.LIKEORDISLIKE.UPDATED,
      data: totalLikesOrDisLikes
    })
  }
  res.json({
    status: 404,
    success: false,
    message: messages.FAILURE.NO_LIKES_OR_DISLIKES_FOUND,
    data: totalLikesOrDisLikes
  })
}
////////////////////END LIKE DISLIKE FUNCTIONS////////////////

////////////////////COMMENT FUNCTIONS START///////////////////
//comment on a post
const saveCommentServiceFunc = async (req, res) => {
  const { errors, isValid } = commentSaveValidator(req.body)

  if (!isValid) {
    return res.json({
      status: 402,
      success: false,
      message: errors
    })
  }
  let post = await Post.findOne({ _id: req.body.postId })
    .lean()
    .exec()
  if (!post) {
    return res.json({
      status: 404,
      success: false,
      message: messages.FAILURE.COMMENT_
    })
  }
  const filter = {
    _id: req.body.postId
  }
  Comment.findOne(filter)
    .populate('user')
    .exec()
    .then(comment => {
      new Comment({
        _id: new mongoose.Types.ObjectId(),
        user: req.body.userId, //logged in user id
        post: req.body.postId,
        parentId: req.body.parentId,
        comment: req.body.comment
      })
        .save()
        .then(innerComment => {
          res.json({
            success: true,
            status: 200,
            message: messages.SUCCESS.COMMENT.CREATED,
            data: {
              id: innerComment._id,
              comment: innerComment.comment,
              createdAt: innerComment.createdAt,
              updatedAt: innerComment.updatedAt
            }
          })
        })
    })
    .catch(err => {
      res.json({
        status: 500,
        success: false,
        message: err
      })
    })
}

//update comment
const updateCommentServiceFunc = async (req, res) => {
  const { errors, isValid } = commentUpdateValidator(req.body)
  console.log('isValid', isValid)
  if (!isValid) {
    return res.json({
      status: 404,
      success: false,
      message: errors
    })
  }
  // Get fields
  const commentFields = {}

  if (req.body.commentId) {
    commentFields.comment = req.body.comment
  }
  let comment = await Comment.findOne({ _id: req.body.commentId })
    .lean()
    .exec()
  console.log('comment', comment)
  if (!comment) {
    return res.json({
      status: 404,
      success: false,
      message: messages.FAILURE.COMMENT_NOT_FOUND
    })
  }

  Comment.findOneAndUpdate(
    { _id: req.body.commentId },
    { $set: commentFields },
    { new: true }
  )
    .then(innerComment => {
      res.json({
        success: true,
        message: messages.SUCCESS.COMMENT.UPDATED,
        data: {
          id: innerComment._id,
          comment: innerComment.comment,
          createdAt: innerComment.createdAt,
          updatedAt: innerComment.updatedAt
        }
      })
    })
    .catch(err => {
      res.json({
        status: 500,
        success: false,
        message: err
      })
    })
}

//delete comment
const deleteCommentServiceFunc = async (req, res) => {
  const { errors, isValid } = commentDeleteValidator(req.body)
  if (!isValid) {
    return res.json({
      status: 404,
      success: false,
      message: errors
    })
  }
  // Get fields
  const commentFields = {}

  if (req.body.commentId) {
    commentFields.commentId = req.body.commentId
  }
  Comment.findByIdAndDelete(req.body.commentId)
    .then(comment => {
      if (comment !== null) {
        res.json({
          success: true,
          message: messages.SUCCESS.COMMENT.DELETED
        })
      } else {
        res.json({
          success: false,
          message: messages.FAILURE.COMMENT_NOT_FOUND
        })
      }
    })
    .catch(err => {
      res.json({
        status: 500,
        success: false,
        message: err && err.message ? err.message : ''
      })
    })
}
////////////////////END COMMENT FUNCTIONS////////////////////

module.exports = {
  savePostServiceFunc,
  saveCommentServiceFunc,
  updatePostServiceFunc,
  likePostServiceFunc,
  disLikePostServiceFunc,
  getAPostViaIdServiceFunc,
  getAllPostsViaUserIdServiceFunc,
  getAllLikesOrDisLikesOnAPostViaPostIdServiceFunc,
  getAllPostsServiceFunc,
  deletePostServiceFunc,
  updateCommentServiceFunc,
  deleteCommentServiceFunc
}
