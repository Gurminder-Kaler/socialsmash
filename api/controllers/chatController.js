const {
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
} = require("@services/chatService");

//@private
//@usage : get all groups
exports.getAllGroups = async (req, res) => {
  try {
    var result = await getAllGroupsServiceFunc(req, res);
    return result;
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err && err.message ? err.message : "",
    });
  }
};
//@private
//@usage : get a group via Id
exports.getAGroupViaGroupId = async (req, res) => {
  try {
    var result = await getAGroupViaGroupIdServiceFunc(req, res);
    return result;
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err && err.message ? err.message : "",
    });
  }
};

//@private
//@usage : send the message
exports.sendMessage = async (req, res) => {
  try {
    var result = await sendMessageServiceFunc(req, res);
    return result;
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err && err.message ? err.message : "",
    });
  }
};
//@private
//@usage : edit the message
exports.editMessage = async (req, res) => {
  try {
    var result = await editMessageServiceFunc(req, res);
    return result;
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err && err.message ? err.message : "",
    });
  }
};
//@private
//@usage : create a message group
exports.createGroup = async (req, res) => {
  try {
    var result = await createGroupServiceFunc(req, res);
    return result;
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err && err.message ? err.message : "",
    });
  }
};
//@private
//@usage : add user to group
exports.addUserToGroup = async (req, res) => {
  try {
    var result = await addUserToGroupServiceFunc(req, res);
    return result;
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err && err.message ? err.message : "",
    });
  }
};
//@private
//@usage : add report
exports.reportGroup = async (req, res) => {
  try {
    var result = await reportGroupServiceFunc(req, res);
    return result;
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err && err.message ? err.message : "",
    });
  }
};
//@private
//@usage : leave group
exports.leaveGroup = async (req, res) => {
  try {
    var result = await leaveGroupServiceFunc(req, res);
    return result;
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err && err.message ? err.message : "",
    });
  }
};
//@private
//@usage : get groups via user id
exports.getGroupsViaUserId = async (req, res) => {
  try {
    var result = await getGroupsViaUserIdServiceFunc(req, res);
    return result;
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err && err.message ? err.message : "",
    });
  }
};
//@private
//@usage : add admin to the group
exports.addAdminOfGroup = async (req, res) => {
  try {
    var result = await addAdminOfGroupServiceFunc(req, res);
    return result;
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err && err.message ? err.message : "",
    });
  }
};
//@private
//@usage : add user who wants to mute
exports.muteGroupViaUserId = async (req, res) => {
  try {
    var result = await muteGroupViaUserIdServiceFunc(req, res);
    return result;
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err && err.message ? err.message : "",
    });
  }
};
//@private
//@usage : lock group via user Id
exports.lockGroupViaUserId = async (req, res) => {
  try {
    var result = await lockGroupViaUserIdServiceFunc(req, res);
    return result;
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err && err.message ? err.message : "",
    });
  }
};
//@private
//@usage : get messages within a group
exports.getMessagesViaGroupId = async (req, res) => {
  try {
    var result = await getMessagesViaGroupIdServiceFunc(req, res);
    return result;
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err && err.message ? err.message : "",
    });
  }
};
//@private
//@usage : get messages within 2 users
exports.getMessagesBetweenTwoUsers = async (req, res) => {
  try {
    var result = await getMessagesBetweenTwoUsersServiceFunc(req, res);
    return result;
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err && err.message ? err.message : "",
    });
  }
};
//@private
//@usage : delete message based on deletedType
exports.deleteMessage = async (req, res) => {
  try {
    var result = await deleteMessageServiceFunc(req, res);
    return result;
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err && err.message ? err.message : "",
    });
  }
};
