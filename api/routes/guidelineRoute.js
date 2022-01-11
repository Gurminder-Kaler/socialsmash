
const express = require('express');
const router = express.Router();
const guidelineController = require('@controllers/guidelineController');

router.get('/getGuideline/:type', guidelineController.getGuideline);

router.post('/updateGuideline', guidelineController.updateGuideline);

module.exports = router;