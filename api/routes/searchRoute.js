const express = require("express");
const router = express.Router();

const searchController = require("@controllers/searchController");

router.post("/searchPeople", searchController.searchPeople);

router.post("/searchCompany", searchController.searchCompany);

module.exports = router;
