const mongoose = require('mongoose');
const User = require('@models/userModel');
const SmileySticker = require('@models/SmileyStickerModel');
const messages = require('@constants/messages');
const smileyStickerAddValidator = require('@validations/smileyStickerRequest/smileyStickerAddValidator');

const getAllSmileyStickerServiceFunc = async (req, res) => {

    SmileySticker.find({type: req.params.type}).then(result => {
        if(result) {
            res.json({
                status: 201,
                data : result,
                success: true,
                message: messages.SUCCESS.SMILEYSTICKER.FETCHED,
            });
        } else {
            res.json({
                status: 401,
                success: false,
                message: messages.FAILURE.SWW
            });
        }
    })
    .catch(err => {
        res.json({
            status: 500,
            success: false,
            message: 'err'
        });
    });
}

const updateSmileyStickerServiceFunc = async (req, res) => {
    const filter = {
        _id: req.body.type
    };
    const data = {
        profession: req.body.profession
    };
    SmileySticker.findOneAndUpdate(
        filter,
        { $set: data },
        {
            Original: false,
            useFindAndModify: false,
        }).then(result => {
        if(result) {
        SmileySticker.find().then(professions => {
            if (professions) {
                var i= 0;
                var arr = [];
                var obj = {};
                for(i= 0; i< professions.length ; i++) {
                    obj = {
                        'id' : professions[i]._id,
                        'name' : professions[i].profession
                    }
                    arr.push(obj);
                }
                res.json({
                    status: 201,
                    data : arr,
                    success: true,
                    message: messages.SUCCESS.PROFESSION.FETCHED,
                });
            } else {
                res.json({
                    status: 401,
                    success: false,
                    message: messages.FAILURE.PROFESSION_NOT_FOUND
                });
            }
        })
        }
        }).catch(err => {
        res.json({
            status: 500,
            success: false,
            message: 'err'
        });
    });
}

const addSmileyStickerServiceFunc = async (req, res) => {
     console.log('service function node req', req.body, req.files);
    const { errors, isValid } = smileyStickerAddValidator(req.body);

    if (!isValid) {
       	return res.json({
			status: 404,
			success: false,
			message: errors,
		});
    }
    const sticker = new SmileySticker({
        _id: new mongoose.Types.ObjectId(),
        type: req.body.type,
        icon: req.files.icon[0].location
    });
    sticker
    .save()
    .then(sticker => {
        SmileySticker.find().then(sticker => {
            if(sticker) {
                res.json({
                    status: 201,
                    success: true,
                    data: sticker,
                    message: messages.SUCCESS.SMILEYSTICKER.CREATED,
                });
            } else {
                res.json({
                    status: 401,
                    success: false,
                    message: messages.FAILURE.SMILEYSTICKER_NOT_FOUND
                });
            }
        })
    }).catch(err => {
        res.json({
            status: 500,
            success: false,
            message: 'err'
        });
    });
}

module.exports = {
    getAllSmileyStickerServiceFunc,
    updateSmileyStickerServiceFunc,
    addSmileyStickerServiceFunc
}