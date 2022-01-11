const mongoose = require('mongoose');
const Guideline = require('@models/guidelineModel');
const messages = require('@constants/messages');
const updateGuidelineValidator = require('@validations/guidelineRequest/updateGuidelineValidator');
const getGuidelineValidator = require('@validations/guidelineRequest/getGuidelineValidator');

const getGuidelineServiceFunc = async (req, res) => {
    try {
        const { errors, isValid } = getGuidelineValidator(req.params);

        if (!isValid) {
            return res.json({
                status: 404,
                success: false,
                message: errors,
            });
        }
        let guide = await Guideline.findOne({type: req.params.type}).lean().exec();
        console.log('guide', guide.data);
        res.json({
            success: true,
            type: req.params.type,
            message: messages.SUCCESS.INFO.FOUND,
            data: guide ? guide.data : 'No Data Found'
        });

    } catch(err) {
        res.json({
            status: 500,
            success: false,
            message: err
        });
    };


}

const updateGuidelineServiceFunc = async (req, res) => {
        const { errors, isValid } = updateGuidelineValidator(req.body);

        if (!isValid) {
            return res.json({
                status: 404,
                success: false,
                message: errors,
            });
        }
        const field = {};

        field.data = req.body.data;

        Guideline.findOneAndUpdate(
        {
            type: req.body.type
        },
        { $set: field },
        { new: true }
        ).then(guide => {
            res.json({
                success: true,
                type: req.body.type,
                message:  messages.SUCCESS.INFO.UPDATED,
                data: guide ? guide.data : 'No Data Found'
            })
        }).catch(err => {
            res.json({
                status: 500,
                success: false,
                message: err
            });
        });

}

module.exports = {
    getGuidelineServiceFunc,
    updateGuidelineServiceFunc
}