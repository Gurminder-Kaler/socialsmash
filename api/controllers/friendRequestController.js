const {
	getAllFriendsViaUserIdServiceFunc,
	sendFriendRequestServiceFunc,
	updateFriendRequestStatusServiceFunc,
	getAllPendingFriendRequestsServiceFunc,
	updateFriendRequestSettingServiceFunc,
	getAllMutualFriendsViaUserIdServiceFunc
}  = require('@services/friendRequestService');

const getAllPendingFriendRequestsValidator = require('@validations/friendRequest/getAllPendingFriendRequestsValidator');

//@private
//@usage : send friend request
exports.getAllFriendsViaUserId = async (req, res) => {
    try {
        var result = await getAllFriendsViaUserIdServiceFunc(req, res);
        return result;
    } catch(err) {
        return res.json({
            status: 500,
            success: false,
            message: (err && err.message) ? err.message : ''
        });
    }
}

//@private
//@usage : send friend request
exports.sendFriendRequest = async (req, res) => {
    try {
        var result = await sendFriendRequestServiceFunc(req, res);
        return result;
    } catch(err) {
        return res.json({
            status: 500,
            success: false,
            message: (err && err.message) ? err.message : ''
        });
    }
}

//@private
//@usage : accept/reject/unfriend friend request
exports.updateFriendRequestStatus = async (req, res) => {
    try {
        var result = await updateFriendRequestStatusServiceFunc(req, res);
        return result;
    } catch(err) {
        return res.json({
            status: 500,
            success: false,
            message: "err"
        });
    }
}

//@private
//@usage : get all pending friend requests
exports.getAllPendingFriendRequests = async (req, res) => {
    try {
        var result = await getAllPendingFriendRequestsServiceFunc(req, res);
        return result;
    } catch(err) {
        return res.json({
            status: 500,
            success: false,
            message: err
        });
    }
}

//@private
//@usage : change friend request setting
exports.updateFriendRequestSetting = async (req, res) => {
    try {
        var result = await updateFriendRequestSettingServiceFunc(req, res);
        return result;
    } catch(err) {
        return res.json({
            status: 500,
            success: false,
            message: err
        });
    }
}
//@private
//@usage : get all mutual friends via userId
exports.getAllMutualFriendsViaUserId = async (req, res) => {
    try {
        var result = await getAllMutualFriendsViaUserIdServiceFunc(req, res);
        return result;
    } catch(err) {
        return res.json({
            status: 500,
            success: false,
            message: err
        });
    }
}
