
const {
	getAllSmileyStickerServiceFunc,
    updateSmileyStickerServiceFunc,
    addSmileyStickerServiceFunc
}  = require('@services/smileyStickerService');


//@private
//@usage get all the smilies and stickers from the database.
exports.getAllSmileySticker = async (req, res) => {
   try {
        return await getAllSmileyStickerServiceFunc(req, res);
    } catch(err) {
        return res.json({
            status: 500,
            success: false,
            message: err
        });
    }
}

//@private
//@usage update smiley in db
exports.updateSmileySticker = async (req, res) => {
   try {
        return await updateSmileyStickerServiceFunc(req, res);
    } catch(err) {
        return res.json({
            status: 500,
            success: false,
            message: err
        });
    }
}

//@private
//@usage add smiley to db
exports.addSmileySticker = async (req, res) => {
    console.log('avbc', req.files);
   try {
        return await addSmileyStickerServiceFunc(req, res);
    } catch(err) {
        return res.json({
            status: 500,
            success: false,
            message: err
        });
    }
}
