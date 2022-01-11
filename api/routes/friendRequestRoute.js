const express = require('express');
const router = express.Router();

const friendRequestController = require('@controllers/friendRequestController');

router.post('/sendFriendRequest', friendRequestController.sendFriendRequest);

router.post('/updateFriendRequestStatus', friendRequestController.updateFriendRequestStatus);

router.post('/getAllFriendsViaId', friendRequestController.getAllFriendsViaUserId);

router.post('/getAllPendingFriendRequests', friendRequestController.getAllPendingFriendRequests);

router.post('/updateFriendRequestSetting', friendRequestController.updateFriendRequestSetting);

// router.post('/getAllMutualFriendsViaUserId', friendRequestController.getAllMutualFriendsViaUserId);


module.exports = router;