const mongoose = require('mongoose');
const User = require('@models/userModel');
const Profession = require('@models/professionModel');
const messages = require('@constants/messages');

const getAllProfessionsServiceFunc = async (req, res) => {
    Profession.find().then(result => {
        if(result) {
            console.log('result', result[0]);
            var i= 0;
            var arr = [];
            var obj = {};
            for(i= 0; i< result.length ; i++) {
                // console.log(result[i]);
                obj = {
                    'id' : result[i]._id,
                    'name' : result[i].profession
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

const updateProfessionServiceFunc = async (req, res) => {
    console.log('res', res.body);
    const filter = {
        _id: req.body.id
    };
    const data = {
        profession: req.body.profession
    };
    Profession.findOneAndUpdate(filter, { $set: data }, {
        Original: false,
        useFindAndModify: false,
    }).then(result => {
        if(result) {
        Profession.find().then(professions => {
            if(professions) {
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

const addProfessionServiceFunc = async (req, res) => {
    const profession = new Profession({
        _id: new mongoose.Types.ObjectId(),
        profession: req.body.profession,
    });
    profession
    .save()
    .then(profession => {
        Profession.find().then(professions => {
            if(professions) {
                res.json({
                    status: 201,
                    success: true,
                    data: professions,
                    message: messages.SUCCESS.PROFESSION.ADDED,
                });
            } else {
                res.json({
                    status: 401,
                    success: false,
                    message: messages.FAILURE.PROFESSION_NOT_FOUND
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

    getAllProfessionsServiceFunc,
    updateProfessionServiceFunc,
    addProfessionServiceFunc
}