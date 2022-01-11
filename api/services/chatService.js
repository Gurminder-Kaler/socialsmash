const mongoose = require("mongoose");
const ChatRoom = require("@models/chatRoomModel");
const ChatMessage = require("@models/chatMessageModel");
const ReportChatRoom = require("@models/reportChatRoomModel");
const User = require("@models/userModel");
const messages = require("@constants/messages");
const editMessageValidator = require("@validations/chatRequest/editMessageValidator");
const sendMessageValidator = require("@validations/chatRequest/sendMessageValidator");
const createGroupValidator = require("@validations/chatRequest/createGroupValidator");
const addUserToGroupValidator = require("@validations/chatRequest/addUserToGroupValidator");
const reportGroupValidator = require("@validations/chatRequest/reportGroupValidator");
const leaveGroupValidator = require("@validations/chatRequest/leaveGroupValidator");
const addAdminOfGroupValidator = require("@validations/chatRequest/addAdminOfGroupValidator");
const getGroupsViaUserIdValidator = require("@validations/chatRequest/getGroupsViaUserIdValidator");
const muteGroupViaUserIdValidator = require("@validations/chatRequest/muteGroupViaUserIdValidator");
const lockGroupViaUserIdValidator = require("@validations/chatRequest/lockGroupViaUserIdValidator");
const getMessagesViaGroupIdValidator = require("@validations/chatRequest/getMessagesViaGroupIdValidator");
// const getMessagesBetweenTwoUsersValidator = require('@validations/chatRequest/getMessagesBetweenTwoUsersValidator')
const deleteMessageValidator = require("@validations/chatRequest/deleteMessageValidator");
const isEmpty = require("@validations/is-empty");

const sendMessageServiceFunc = async (req, res) => {
  try {
    console.log("req.boody", req.body);
    const { errors, isValid } = sendMessageValidator(req.body);

    if (!isValid) {
      return res.json({
        status: 400,
        success: false,
        message: errors,
      });
    }
    let type = req.body.type;
    if (type == "one_to_one") {
      var chatRoomId = "";
      let arrayOfUserIds = [];
      let senderId = req.body.senderId;
      let receiverId = req.body.receiverId;
      let receiver = await User.findOne({ _id: req.body.receiverId })
        .lean()
        .exec();
      if (isEmpty(receiver)) {
        return res.json({
          status: 404,
          success: false,
          message: messages.FAILURE.RECEIVER_NOT_FOUND,
        });
      }
      let sender = await User.findOne({ _id: req.body.senderId }).lean().exec();
      if (isEmpty(sender)) {
        return res.json({
          status: 404,
          success: false,
          message: messages.FAILURE.SENDER_NOT_FOUND,
        });
      }

      arrayOfUserIds.push(senderId);
      arrayOfUserIds.push(receiverId);
      let filter = {
        userIds: { $all: [senderId, receiverId] },
        type: type,
      };
      console.log("filter", filter);
      ChatRoom.findOne(filter).then((result) => {
        console.log("RESULT222222222....,.,.,.,/////", result);
        if (!isEmpty(result)) {
          // chat already took place
          console.log("UPppppp");
          chatRoomId = result._id;
        } else {
          //no prior chat took place

          console.log("DOwnnnnnnn");
          let roomData = {
            _id: new mongoose.Types.ObjectId(),
            name: receiver.firstName + " & " + sender.firstName,
            userIds: arrayOfUserIds,
            createdBy: senderId,
          };
          chatRoomId = roomData._id;
          new ChatRoom(roomData).save().then((room) => {});
        }

        //above if else gives chatRoomId.
        let data = {
          _id: new mongoose.Types.ObjectId(),
          chatRoom: chatRoomId,
          createdBy: senderId,
          message: req.body.message,
        };

        new ChatMessage(data)
          .populate("createdBy", "-password, -otp")
          .save()
          .then((aresult) => {
            res.json({
              success: true,
              status: 200,
              message: messages.SUCCESS.CHAT.MESSAGE.CREATED,
              data: aresult,
            });
          });
      });
    } else if (type == "many_to_many") {
      //check 1 : if chat room is many_to_many(group)
      console.log("req.body", req.body);
      var groupId = req.body.groupId;
      let senderId = req.body.senderId;
      let arrayOfUserIds = [];
      let checkone = await ChatRoom.findOne({ _id: groupId, type: type })
        .lean()
        .exec();
      if (isEmpty(checkone)) {
        return res.json({
          status: 404,
          success: false,
          message: messages.FAILURE.CHATROOM_NOT_FOUND,
        });
      }
      arrayOfUserIds.push(senderId);
      //check 2 : if user belongs to that chat group
      let checktwo = await ChatRoom.findOne({
        _id: groupId,
        userIds: { $in: arrayOfUserIds },
      })
        .lean()
        .exec();
      if (isEmpty(checktwo)) {
        return res.json({
          status: 404,
          success: false,
          message: messages.FAILURE.USER_NOT_ASSIGNED_TO_CHATROOM,
        });
      }
      let data = {
        _id: new mongoose.Types.ObjectId(),
        chatRoom: groupId,
        createdBy: senderId,
        message: req.body.message,
      };

      new ChatMessage(data)
        .populate("createdBy", "-password, -otp")
        .save()
        .then((aresult) => {
          res.json({
            success: true,
            status: 200,
            message: messages.SUCCESS.CHAT.MESSAGE.CREATED,
            data: aresult,
          });
        });
    }
  } catch (err) {
    res.json({
      status: 500,
      success: false,
      message: "err",
    });
  }
};

const editMessageServiceFunc = async (req, res) => {
  try {
    const { errors, isValid } = editMessageValidator(req.body);

    if (!isValid) {
      return res.json({
        status: 400,
        success: false,
        message: errors,
      });
    }

    let user = await User.findOne({ _id: req.body.userId }, "-password -otp")
      .lean()
      .exec();
    if (isEmpty(user)) {
      return res.json({
        status: 404,
        success: false,
        message: messages.FAILURE.USER_ONE_NOT_FOUND,
      });
    }
    ChatMessage.findOneAndUpdate(
      {
        _id: req.body.messageId,
      },
      {
        message: req.body.message,
      },
      {
        useFindAndModify: false,
      }
    ).then((result) => {
      res.json({
        success: true,
        status: 200,
        message: messages.SUCCESS.CHAT.MESSAGE.UPDATED,
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

const createGroupServiceFunc = async (req, res) => {
  try {
    const { errors, isValid } = createGroupValidator(req.body);

    if (!isValid) {
      return res.json({
        status: 400,
        success: false,
        message: errors,
      });
    }
    let arrayOfUserIds = [];
    arrayOfUserIds.push(req.body.userId);
    let roomData = {
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      userIds: arrayOfUserIds,
      adminUserIds: arrayOfUserIds,
      createdBy: req.body.userId,
      type: "many_to_many",
    };
    new ChatRoom(roomData).save().then((room) => {
      res.json({
        success: true,
        status: 200,
        message: messages.SUCCESS.CHAT.GROUP.CREATED,
        data: room,
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

const addUserToGroupServiceFunc = async (req, res) => {
  try {
    const { errors, isValid } = addUserToGroupValidator(req.body);

    if (!isValid) {
      return res.json({
        status: 400,
        success: false,
        message: errors,
      });
    }

    ChatRoom.findOneAndUpdate(
      { _id: req.body.groupId },
      { $addToSet: { userIds: req.body.userId } },
      function (error, success) {
        if (error) {
          res.json({
            success: false,
            message: error,
          });
        } else {
          res.json({
            success: true,
            message: messages.SUCCESS.CHAT.GROUP.USER_ADDED,
          });
        }
      }
    );
  } catch (err) {
    res.json({
      status: 500,
      success: false,
      message: "err",
    });
  }
};

const reportGroupServiceFunc = async (req, res) => {
  try {
    const { errors, isValid } = reportGroupValidator(req.body);

    if (!isValid) {
      return res.json({
        status: 400,
        success: false,
        message: errors,
      });
    }
    // check if group exists.
    // check if user if part of group.

    let data = {
      _id: new mongoose.Types.ObjectId(),
      chatRoom: req.body.groupId,
      user: req.body.userId,
      message: req.body.message,
    };
    new ReportChatRoom(data).save().then((report) => {
      res.json({
        success: true,
        message: messages.SUCCESS.CHAT.REPORT.SUBMITTED,
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

const leaveGroupServiceFunc = async (req, res) => {
  try {
    const { errors, isValid } = leaveGroupValidator(req.body);

    if (!isValid) {
      return res.json({
        status: 400,
        success: false,
        message: errors,
      });
    }

    ChatRoom.findOneAndUpdate(
      { _id: req.body.groupId },
      { $pull: { userIds: req.body.userId } }
    ).then((report) => {
      res.json({
        success: true,
        message: messages.SUCCESS.CHAT.USER_REMOVED,
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

const getGroupsViaUserIdServiceFunc = async (req, res) => {
  try {
    const { errors, isValid } = getGroupsViaUserIdValidator(req.body);

    if (!isValid) {
      return res.json({
        status: 400,
        success: false,
        message: errors,
      });
    }

    ChatRoom.find({ type: "many_to_many", userIds: { $in: [req.body.userId] } })
      .populate("createdBy", "-password, -otp")
      .then((groups) => {
        res.json({
          success: true,
          length: groups.length,
          message:
            groups.length > 0
              ? messages.SUCCESS.CHAT.GROUPS_FOUND
              : messages.FAILURE.NO_GROUP_FOUND,
          data: groups,
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

const addAdminOfGroupServiceFunc = async (req, res) => {
  try {
    const { errors, isValid } = addAdminOfGroupValidator(req.body);

    if (!isValid) {
      return res.json({
        status: 400,
        success: false,
        message: errors,
      });
    }

    let chat = await ChatRoom.findOne({
      _id: req.body.groupId,
    })
      .lean()
      .exec();
    if (isEmpty(chat)) {
      return res.json({
        status: 404,
        success: false,
        message: messages.FAILURE.NO_GROUP_FOUND,
      });
    } else {
      if (chat.adminUserIds.indexOf(req.body.userId) == -1) {
        //here admin is assigned
        ChatRoom.findOneAndUpdate(
          { _id: req.body.groupId },
          { $addToSet: { adminUserIds: req.body.userId } }
        ).then((groups) => {
          return res.json({
            status: 200,
            success: true,
            message: messages.SUCCESS.CHAT.ADMIN_ADDED,
          });
        });
      } else {
        return res.json({
          status: 200,
          success: false,
          message: messages.FAILURE.USER_IS_ALREADY_ADMIN,
        });
      }
    }
  } catch (err) {
    res.json({
      status: 500,
      success: false,
      message: "err",
    });
  }
};

const muteGroupViaUserIdServiceFunc = async (req, res) => {
  try {
    const { errors, isValid } = muteGroupViaUserIdValidator(req.body);

    if (!isValid) {
      return res.json({
        status: 400,
        success: false,
        message: errors,
      });
    }
    let chat = await ChatRoom.findOne({
      _id: req.body.groupId,
    })
      .lean()
      .exec();

    if (isEmpty(chat)) {
      return res.json({
        status: 404,
        success: false,
        message: messages.FAILURE.NO_GROUP_FOUND,
      });
    } else {
      var msg = "";

      if (chat.mutedUserIds.indexOf(req.body.userId) == -1) {
        //here user is muted , req.body.userId is pushed in the mutedUserIds array

        ChatRoom.findOneAndUpdate(
          { _id: req.body.groupId },
          { $addToSet: { mutedUserIds: req.body.userId } }
        ).then((group) => {
          return res.json({
            status: 200,
            success: true,
            message: messages.SUCCESS.CHAT.USER_MUTED_GROUP,
            data: group,
          });
        });
      } else {
        //here user is unmuted , userId is pulled from the mutedUserIds array

        ChatRoom.findOneAndUpdate(
          { _id: req.body.groupId },
          { $pull: { mutedUserIds: req.body.userId } }
        ).then((group) => {
          return res.json({
            status: 200,
            success: true,
            message: messages.SUCCESS.CHAT.USER_UNMUTED_GROUP,
            data: group,
          });
        });
      }
    }
  } catch (err) {
    res.json({
      status: 500,
      success: false,
      message: "err",
    });
  }
};

const lockGroupViaUserIdServiceFunc = async (req, res) => {
  try {
    const { errors, isValid } = lockGroupViaUserIdValidator(req.body);

    if (!isValid) {
      return res.json({
        status: 400,
        success: false,
        message: errors,
      });
    }
    let chat = await ChatRoom.findOne({
      _id: req.body.groupId,
    })
      .lean()
      .exec();

    if (isEmpty(chat)) {
      return res.json({
        status: 404,
        success: false,
        message: messages.FAILURE.NO_GROUP_FOUND,
      });
    } else {
      var msg = "";

      if (chat.lockedUserIds.indexOf(req.body.userId) == -1) {
        //here user is muted , req.body.userId is pushed in the lockedUserIds array

        ChatRoom.findOneAndUpdate(
          { _id: req.body.groupId },
          { $addToSet: { lockedUserIds: req.body.userId } }
        ).then((group) => {
          return res.json({
            status: 200,
            success: true,
            message: messages.SUCCESS.CHAT.USER_LOCKED_GROUP,
            data: group,
          });
        });
      } else {
        //here user is unmuted , userId is pulled from the lockedUserIds array

        ChatRoom.findOneAndUpdate(
          { _id: req.body.groupId },
          { $pull: { lockedUserIds: req.body.userId } }
        ).then((group) => {
          return res.json({
            status: 200,
            success: true,
            message: messages.SUCCESS.CHAT.USER_UNLOCKED_GROUP,
            data: group,
          });
        });
      }
    }
  } catch (err) {
    res.json({
      status: 500,
      success: false,
      message: "err",
    });
  }
};

const getMessagesViaGroupIdServiceFunc = async (req, res) => {
  try {
    const { errors, isValid } = getMessagesViaGroupIdValidator(req.body);

    if (!isValid) {
      return res.json({
        status: 400,
        success: false,
        message: errors,
      });
    }

    ChatMessage.find({ chatRoom: req.body.groupId })
      .populate("user", "-password, -otp")
      .then((msg) => {
        res.json({
          success: true,
          message: messages.SUCCESS.CHAT.MESSAGE.FETCHED,
          chat: msg,
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

const getMessagesBetweenTwoUsersServiceFunc = async (req, res) => {
  //user one is primary
  //user two is secondary
  try {
    // const { errors, isValid } = getMessagesBetweenTwoUsersValidator(req.body)

    // if (!isValid) {
    //   return res.json({
    //     status: 400,
    //     success: false,
    //     message: errors
    //   })
    // }

    let userOneId = req.body.userOne;
    let userTwoId = req.body.userTwo;
    let userOne = await User.findOne({ _id: userOneId }, "-password -otp")
      .lean()
      .exec();
    if (isEmpty(userOne)) {
      return res.json({
        status: 404,
        success: false,
        message: messages.FAILURE.USER_ONE_NOT_FOUND,
      });
    }
    let userTwo = await User.findOne({ _id: userTwoId }, "-password -otp")
      .lean()
      .exec();
    if (isEmpty(userTwo)) {
      return res.json({
        status: 404,
        success: false,
        message: messages.FAILURE.USER_TWO_NOT_FOUND,
      });
    }
    let filter = {
      type: "one_to_one",
      userIds: { $all: [userOneId, userTwoId] },
    };
    //     req.body {
    //   userOne: '613e8d5c44363927d4926c69',
    //   userTwo: '613e8e607d8b442c346ac961',
    //   deletedType: 'for_me'
    // }

    let croom = await ChatRoom.findOne(filter).lean().exec();
    console.log("crroom", croom);
    if (isEmpty(croom)) {
      return res.json({
        success: true,
        message: messages.SUCCESS.CHAT.MESSAGE.FETCHED,
        chat: [],
        userOne: userOne,
        userTwo: userTwo,
      });
    }
    // 0:Object
    // deletedType:"for_me"
    // user:"613e8e467d8b442c346ac95d"
    // deletedAt:1637221093959
    ChatMessage.find({
      chatRoom: croom._id,
      deletedInfo: {
        $not: {
          $elemMatch: {
            user: userOneId.toString(),
            deletedType: req.body.deletedType,
          },
        },
      },
    }).then((msgs) => {
      res.json({
        success: true,
        message: messages.SUCCESS.CHAT.MESSAGE.FETCHED,
        chat: msgs,
        userOne: userOne,
        userTwo: userTwo,
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

const deleteMessageServiceFunc = async (req, res) => {
  try {
    const { errors, isValid } = deleteMessageValidator(req.body);

    if (!isValid) {
      return res.json({
        status: 400,
        success: false,
        message: errors,
      });
    }

    let messageId = req.body.messageId;
    let userId = req.body.userId;
    let deletedType = req.body.deletedType;
    //check if user with this id exists.
    let user = await User.findOne({ _id: userId }, "-password -otp")
      .lean()
      .exec();
    if (isEmpty(user)) {
      return res.json({
        status: 404,
        success: false,
        message: messages.FAILURE.USER_ONE_NOT_FOUND,
      });
    }
    //check two : only user who created this message can "delete for all"
    if (deletedType == "for_all") {
      let chatMsg = await ChatMessage.findOne({ _id: messageId }, "_id")
        .lean()
        .exec();
      if (chatMsg._id !== userId) {
        return res.json({
          status: 401,
          success: false,
          message: messages.FAILURE.NOT_YOUR_MESSAGE_SO_CANNOT_DELETE_FOR_ALL,
        });
      }
    }
    ChatMessage.findOneAndUpdate(
      {
        _id: messageId,
      },
      {
        $addToSet: {
          deletedInfo: {
            deletedType: deletedType,
            user: userId,
            deletedAt: Date.now(),
          },
        },
      }
    ).then((msg) => {
      res.json({
        success: true,
        message: messages.SUCCESS.CHAT.MESSAGE.DELETED,
        user: user,
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

const getAllGroupsServiceFunc = async (req, res) => {
  try {
    // const { errors, isValid } = getAllGroupsValidator(req.body)

    // if (!isValid) {
    //   return res.json({
    //     status: 400,
    //     success: false,
    //     message: errors
    //   })
    // }
    ChatRoom.find({ type: "many_to_many" })
      .populate("createdBy", "-password, -otp")
      .then((rooms) => {
        res.json({
          success: true,
          message: messages.SUCCESS.CHAT.FETCHED,
          data: rooms,
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

const getAGroupViaGroupIdServiceFunc = async (req, res) => {
  try {
    const { errors, isValid } = getMessagesViaGroupIdValidator(req.body);

    if (!isValid) {
      return res.json({
        status: 400,
        success: false,
        message: errors,
      });
    }

    let room = await ChatRoom.findOne({ _id: req.body.groupId }).lean().exec();
    ChatMessage.find({ chatRoom: req.body.groupId })
      .populate("createdBy", "-password, -otp")
      .then((msgs) => {
        res.json({
          success: true,
          data: room,
          chat: msgs,
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

module.exports = {
  sendMessageServiceFunc,
  createGroupServiceFunc,
  editMessageServiceFunc,
  addUserToGroupServiceFunc,
  reportGroupServiceFunc,
  leaveGroupServiceFunc,
  getGroupsViaUserIdServiceFunc,
  addAdminOfGroupServiceFunc,
  muteGroupViaUserIdServiceFunc,
  lockGroupViaUserIdServiceFunc,
  getMessagesViaGroupIdServiceFunc,
  getMessagesBetweenTwoUsersServiceFunc,
  deleteMessageServiceFunc,
  getAllGroupsServiceFunc,
  getAGroupViaGroupIdServiceFunc,
};
