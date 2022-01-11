const express = require("express");

const router = express.Router();

const settingController = require("@controllers/settingController");

router.post("/updatePassword", settingController.updatePassword);

router.get("/getDashboardCount", settingController.getDashboardCount);

module.exports = router;
