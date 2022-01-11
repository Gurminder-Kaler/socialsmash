const {
  savePostServiceFunc,
  updatePostServiceFunc,
  getAPostViaIdServiceFunc,
  getAllPostsViaUserIdServiceFunc,
  likePostServiceFunc,
  disLikePostServiceFunc,
  getAllLikesOrDisLikesOnAPostViaPostIdServiceFunc,
  getAllPostsServiceFunc,
  deletePostServiceFunc,
  saveCommentServiceFunc,
  deleteCommentServiceFunc,
  updateCommentServiceFunc
} = require('@services/postService')
//async await cannot be put into loop so refactoring of code cannot be done further than this
//@private
//@usage : save Post
exports.savePost = async (req, res) => {
  try {
    console.log('req111', req.body)
    let re = await savePostServiceFunc(req, res)
    return re
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err
    })
  }
}

//@private
//@usage update post in db
exports.updatePost = async (req, res) => {
  try {
    return await updatePostServiceFunc(req, res)
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err
    })
  }
}
//@private
//@usage get all the posts from the database via userId.
exports.getAllPostsViaUserId = async (req, res) => {
  try {
    return await getAllPostsViaUserIdServiceFunc(req, res)
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err
    })
  }
}
//@private
//@usage get all likes on a post via post_id.
exports.getAllLikesOrDisLikesOnAPostViaPostId = async (req, res) => {
  try {
    return await getAllLikesOrDisLikesOnAPostViaPostIdServiceFunc(req, res)
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err
    })
  }
}
//@private
//@usage get single post via Id
exports.getAPostViaId = async (req, res) => {
  try {
    return await getAPostViaIdServiceFunc(req, res)
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err
    })
  }
}
//@private
//@usage getAllPosts
exports.getAllPosts = async (req, res) => {
  try {
    return await getAllPostsServiceFunc(req, res)
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err
    })
  }
}
//@private
//@usage deletePost
exports.deletePost = async (req, res) => {
  try {
    return await deletePostServiceFunc(req, res)
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err
    })
  }
}

//@private//@usage do like
exports.likePost = async (req, res) => {
  try {
    return await likePostServiceFunc(req, res)
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err
    })
  }
}
//@private
//@usage do dis-like
exports.disLikePost = async (req, res) => {
  try {
    return await disLikePostServiceFunc(req, res)
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err
    })
  }
}

//@private
//@usage : save Comment
exports.saveComment = async (req, res) => {
  try {
    return await saveCommentServiceFunc(req, res)
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err
    })
  }
}
//@private
//@usage : update comment
exports.updateComment = async (req, res) => {
  try {
    return await updateCommentServiceFunc(req, res)
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err
    })
  }
}
//@private
//@usage : delete comment
exports.deleteComment = async (req, res) => {
  try {
    return await deleteCommentServiceFunc(req, res)
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err
    })
  }
}
