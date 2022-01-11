const express = require("express");
const router = express.Router();
const chatController = require("@controllers/chatController");

router.post("/sendMessage", chatController.sendMessage);
router.post("/getAllGroups", chatController.getAllGroups);
router.post("/getGroupsViaUserId", chatController.getGroupsViaUserId);
router.post("/createGroup", chatController.createGroup);
router.post("/editMessage", chatController.editMessage);
router.post("/addUserToGroup", chatController.addUserToGroup);
router.post("/reportGroup", chatController.reportGroup);
router.post("/leaveGroup", chatController.leaveGroup);
router.post("/addAdminOfGroup", chatController.addAdminOfGroup);
router.post("/muteGroupViaUserId", chatController.muteGroupViaUserId);
router.post("/lockGroupViaUserId", chatController.lockGroupViaUserId);
router.post("/getMessagesViaGroupId", chatController.getMessagesViaGroupId);
router.post(
  "/getMessagesBetweenTwoUsers",
  chatController.getMessagesBetweenTwoUsers
);
router.post("/deleteMessage", chatController.deleteMessage);
router.post("/getAGroupViaGroupId", chatController.getAGroupViaGroupId);

module.exports = router;
