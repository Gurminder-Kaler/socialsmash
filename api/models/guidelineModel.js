const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const guidelineRequestSchema = Schema({
    _id: Schema.Types.ObjectId,
    data: {
        type: String,
        required: true
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

module.exports = mongoose.model('Guideline', guidelineRequestSchema);