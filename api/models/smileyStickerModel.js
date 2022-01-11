const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const smileyStickerSchema = Schema({
    _id: Schema.Types.ObjectId,
    icon: { type: String },
    type: {
        type: String,
        trim: true,
        enum : ['sticker', 'smiley'],
        default: 'smiley'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: null
    },
    deletedAt: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model('SmileySticker', smileyStickerSchema);