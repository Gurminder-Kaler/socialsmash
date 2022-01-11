const express = require('express');
const router = express.Router();
const professionController = require('@controllers/professionController');


router.get('/getAllProfessions', professionController.getAllProfessions);

router.post('/addProfession', professionController.addProfession);

router.post('/updateProfession', professionController.updateProfession);

// router.post('/deleteProfession',  professionController.deleteProfession);

module.exports = router;