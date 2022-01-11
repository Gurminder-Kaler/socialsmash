const mongoose = require("mongoose");
const FriendRequest = require("@models/friendRequestModel");
const User = require("@models/userModel");
const messages = require("@constants/messages");
const friendRequestSendValidator = require("@validations/friendRequest/friendRequestSendValidator");
const updateFriendRequestStatusValidator = require("@validations/friendRequest/updateFriendRequestStatusValidator");
const getAllFriendsViaIdRequestValidator = require("@validations/friendRequest/getAllFriendsViaIdRequestValidator");
const getAllPendingFriendRequestsValidator = require("@validations/friendRequest/getAllPendingFriendRequestsValidator");
const friendRequestSettingValidator = require("@validations/friendRequest/friendRequestSettingValidator");
const isEmpty = require("@validations/is-empty");

function getMyFriends(userId) {
  let friendsUserIds = [];

  let sentAcceptedRequests = FriendRequest.find({
    status: "accepted",
    sender: mongoose.Types.ObjectId(userId),
  })
    .lean()
    .exec();

  let receivedAcceptedRequests = FriendRequest.find({
    status: "accepted",
    receiver: mongoose.Types.ObjectId(userId),
  })
    .lean()
    .exec();

  for (let i = 0; i < sentAcceptedRequests.length; i++) {
    friendsUserIds.push(sentAcceptedRequests[i].receiver);
  }
  for (let i = 0; i < receivedAcceptedRequests.length; i++) {
    friendsUserIds.push(receivedAcceptedRequests[i].sender);
  }

  let users = User.find({ _id: { $in: friendsUserIds } })
    .lean()
    .exec(); //1

  return users;
}

const getAllFriendsViaUserIdServiceFunc = async (req, res) => {
  try {
    const { errors, isValid } = getAllFriendsViaIdRequestValidator(req.body);

    if (!isValid) {
      return res.json({
        status: 400,
        success: false,
        message: errors,
      });
    }

    let user = await User.findOne({ _id: req.body.userId }).lean().exec();
    if (isEmpty(user)) {
      return res.json({
        status: 404,
        success: false,
        message: messages.FAILURE.USER_NOT_FOUND,
      });
    }
    const userId = req.body.userId;
    let friendsUserIds = [];

    let sentAcceptedRequests = await FriendRequest.find({
      status: "accepted",
      sender: mongoose.Types.ObjectId(userId),
    })
      .lean()
      .exec();

    let receivedAcceptedRequests = await FriendRequest.find({
      status: "accepted",
      receiver: mongoose.Types.ObjectId(userId),
    })
      .lean()
      .exec();

    for (let i = 0; i < sentAcceptedRequests.length; i++) {
      friendsUserIds.push(sentAcceptedRequests[i].receiver);
    }
    for (let i = 0; i < receivedAcceptedRequests.length; i++) {
      friendsUserIds.push(receivedAcceptedRequests[i].sender);
    }

    let myFriends = await User.find({ _id: { $in: friendsUserIds } })
      .lean()
      .exec(); //1
    // getMyFriends(req.body.userId).then( res => {
    //     console.log('res', res);
    //     myFriends = res
    // });

    if (myFriends.length > 0) {
      res.json({
        success: true,
        status: 200,
        message: messages.SUCCESS.FRIENDREQUEST.FOUND.ACCEPTED,
        data: myFriends,
      });
    } else {
      res.json({
        success: false,
        status: 404,
        message: messages.FAILURE.NO_FRIENDS_FOUND,
        data: [],
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

const getAllMutualFriendsViaUserIdServiceFunc = async (req, res) => {
  let user = await User.findOne({ _id: req.body.userId }).lean().exec();
  if (isEmpty(user)) {
    return res.json({
      status: 404,
      success: false,
      message: messages.FAILURE.USER_NOT_FOUND,
    });
  }
  let otherUser = await User.findOne({ _id: req.body.otherUserId })
    .lean()
    .exec();
  if (isEmpty(user)) {
    return res.json({
      status: 404,
      success: false,
      message: messages.FAILURE.USER_NOT_FOUND,
    });
  }
  let myFriendsArray = getMyFriends(req.body.userId);
  let otherUserFriendsArray = getMyFriends(req.body.otherUserId);
  let mutualArrays = myFriendsArray.filter((value) =>
    otherUserFriendsArray.includes(value)
  );
  console.log("mutialArrays", mutualArrays);
};

//request sent to other people and they did not accept it (my_request).
//request received from other people and I did not accept it yet(new_request)
const getAllPendingFriendRequestsServiceFunc = async (req, res) => {
  try {
    const { errors, isValid } = getAllPendingFriendRequestsValidator(req.body);
    if (!isValid) {
      return res.json({
        status: 400,
        success: false,
        message: errors,
      });
    }
    let user = await User.findOne({ _id: req.body.userId }).lean().exec();
    if (isEmpty(user)) {
      return res.json({
        status: 404,
        success: false,
        message: messages.FAILURE.USER_NOT_FOUND,
      });
    }
    let friendsUserIds = [];

    let sentAcceptedRequests = await FriendRequest.find({
      status: "pending",
      sender: mongoose.Types.ObjectId(req.body.userId),
    })
      .lean()
      .exec();

    let receivedAcceptedRequests = await FriendRequest.find({
      status: "pending",
      receiver: mongoose.Types.ObjectId(req.body.userId),
    })
      .lean()
      .exec();

    for (let i = 0; i < sentAcceptedRequests.length; i++) {
      friendsUserIds.push(sentAcceptedRequests[i].receiver);
    }
    for (let i = 0; i < receivedAcceptedRequests.length; i++) {
      friendsUserIds.push(receivedAcceptedRequests[i].sender);
    }

    let myFriends = await User.find({ _id: { $in: friendsUserIds } })
      .lean()
      .exec();
    if (myFriends.length > 0) {
      res.json({
        success: true,
        status: 200,
        message: messages.SUCCESS.FRIENDREQUEST.FOUND.PENDING,
        data: myFriends,
      });
    } else {
      res.json({
        success: false,
        status: 404,
        message: messages.FAILURE.NO_FRIEND_REQUESTS_FOUND,
        data: [],
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

const sendFriendRequestServiceFunc = async (req, res) => {
  //
  const { errors, isValid } = friendRequestSendValidator(req.body);

  if (!isValid) {
    return res.json({
      status: 400,
      success: false,
      message: errors,
    });
  }
  // Get fields
  const friendRequestFields = {};
  //check if sender is valid
  let sender = await User.findOne({ _id: req.body.senderId }).lean().exec();

  if (sender == undefined) {
    res.json({
      status: 404,
      success: false,
      message: messages.FAILURE.SENDER_NOT_FOUND,
    });
  }

  ////////////////stop the user if he has blocked friend requests///////////////
  //check if receiver is valid
  let receiver = await User.findOne({ _id: req.body.receiverId }).lean().exec();

  if (receiver == undefined) {
    res.json({
      status: 404,
      success: false,
      message: messages.FAILURE.RECEIVER_NOT_FOUND,
    });
  }
  if (receiver.requestsFromPublic == false) {
    res.json({
      status: 401,
      success: false,
      message: messages.FAILURE.PUBLIC_REQUESTS_DISABLED,
    });
  }
  if (receiver.blockAllFriendRequests == true) {
    res.json({
      status: 401,
      success: false,
      message: messages.FAILURE.DISABLED_CANNOT_RECEIVE_REQUEST,
    });
  }

  if (req.body.senderId) {
    friendRequestFields.sender = sender;
  }
  if (req.body.receiverId) {
    friendRequestFields.receiver = receiver;
  }
  //check if friend request already sent.
  let friendRequest = await FriendRequest.find(friendRequestFields)
    .lean()
    .exec();
  if (friendRequest.length > 0) {
    res.json({
      status: 401,
      success: false,
      message: messages.FAILURE.FRIEND_REQUEST_ALREADY_SENT,
      data: friendRequest,
    });
  }

  // Create new Request
  new FriendRequest({
    _id: new mongoose.Types.ObjectId(),
    sender: sender,
    receiver: receiver,
  })
    .save()
    .then((doc) => {
      res.json({
        success: true,
        message: messages.SUCCESS.FRIENDREQUEST.SENT,
        data: {
          id: doc._id,
          senderId: doc.sender,
          receiverId: doc.receiver,
          status: doc.status,
          createdAt: doc.createdAt,
          updatedAt: doc.updatedAt,
        },
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        success: false,
        message: err.message ? err.message.message : "",
      });
    });
};

const updateFriendRequestStatusServiceFunc = async (req, res) => {
  const { errors, isValid } = updateFriendRequestStatusValidator(req.body);

  if (!isValid) {
    return res.json({
      status: 400,
      success: false,
      message: errors,
    });
  }
  // Get fields
  const friendRequestFields = {};
  const checkExistsFields = {};

  if (req.body.senderId) {
    friendRequestFields.sender = mongoose.Types.ObjectId(req.body.senderId);
    checkExistsFields.sender = mongoose.Types.ObjectId(req.body.senderId);
  }
  if (req.body.receiverId) {
    friendRequestFields.receiver = mongoose.Types.ObjectId(req.body.receiverId);
    checkExistsFields.receiver = mongoose.Types.ObjectId(req.body.receiverId);
  }
  if (req.body.status) {
    friendRequestFields.status = req.body.status;
  }
  FriendRequest.findOne(checkExistsFields)
    .exec()
    .then((fr) => {
      if (fr !== null) {
        const update = { status: friendRequestFields.status };
        FriendRequest.findOneAndUpdate(
          checkExistsFields,
          { $set: update },
          { new: true },
          (err, doc) => {
            if (err) {
              res.json({
                status: 501,
                success: false,
                message: messages.FAILURE.SWW,
              });
            }
          }
        ).then((result) => {
          res.json({
            success: true,
            status: 200,
            message: messages.SUCCESS.FRIENDREQUEST.STATUS,
          });
        });
      } else {
        new FriendRequest({
          _id: new mongoose.Types.ObjectId(),
          senderId: req.body.senderId,
          receiverId: req.body.receiverId,
          status: req.body.status,
        })
          .save()
          .then((innerRequest) => {
            res.json({
              success: true,
              message: messages.SUCCESS.FRIENDREQUEST.ACCEPTED,
              data: {
                id: innerRequest._id,
                senderId: innerRequest.senderId,
                receiverId: innerRequest.receiverId,
                status: innerRequest.status,
                createdAt: innerRequest.createdAt,
                updatedAt: innerRequest.updatedAt,
              },
            });
          });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        success: false,
        message: err,
      });
    });
};

const updateFriendRequestSettingServiceFunc = async (req, res) => {
  const { errors, isValid } = friendRequestSettingValidator(req.body);

  if (!isValid) {
    return res.json({
      status: 400,
      success: false,
      message: errors,
    });
  }
  //check if user exists in the db
  const userId = req.body.userId;
  let user = await User.findOne({ _id: userId }).lean().exec();

  if (isEmpty(user)) {
    return res.json({
      status: 404,
      success: false,
      message: messages.FAILURE.USER_NOT_FOUND,
    });
  }

  const type = req.body.type;
  const value = req.body.value;

  let fields = {};

  if (type == "accept_all" || type == "decline_all") {
    if (type == "accept_all") {
      FriendRequest.find({
        status: "pending",
        receiver: mongoose.Types.ObjectId(userId),
      }).then((friends) => {
        friends.map((friend) => {
          friend.update({ status: "accepted" }).lean().exec();
        });
      });

      res.json({
        success: true,
        status: 200,
        message: messages.SUCCESS.FRIENDREQUESTSETTING.UPDATED,
      });
    } else {
      // decline_all
      FriendRequest.find({
        status: "pending",
        receiver: mongoose.Types.ObjectId(userId),
      }).then((friends) => {
        friends.map((friend) => {
          friend.update({ status: "rejected" }).lean().exec();
        });
      });
      res.json({
        success: true,
        status: 200,
        message: messages.SUCCESS.FRIENDREQUESTSETTING.UPDATED,
      });
    }
  } else {
    if (type == "request_from_public") {
      fields.requestsFromPublic = value;
    } else if (type == "request_from_mutuals") {
      fields.requestsFromMutuals = value;
    } else if (type == "block_all_requests") {
      fields.blockAllFriendRequests = value;
    }
    User.findOneAndUpdate(
      { _id: userId },
      { $set: fields },
      { new: true },
      (err, doc) => {
        if (err) {
          res.json({
            status: 501,
            success: false,
            message: messages.FAILURE.SWW,
          });
        } else {
          res.json({
            success: true,
            status: 200,
            message: messages.SUCCESS.FRIENDREQUESTSETTING.UPDATED,
          });
        }
      }
    ).catch((err) => {
      res.json({
        status: 500,
        success: false,
        message: err,
      });
    });
  }
};

module.exports = {
  getAllPendingFriendRequestsServiceFunc,
  sendFriendRequestServiceFunc,
  updateFriendRequestStatusServiceFunc,
  getAllFriendsViaUserIdServiceFunc,
  updateFriendRequestSettingServiceFunc,
  getAllMutualFriendsViaUserIdServiceFunc,
};
