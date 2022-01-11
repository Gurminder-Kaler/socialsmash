const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = Schema({
    _id: Schema.Types.ObjectId,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
    parentId: {
        type: Number, //for reply
        default: null
    },
    comment : {
        type: String
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

module.exports = mongoose.model('Comment', commentSchema);