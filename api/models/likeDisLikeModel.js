const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const likeDisLikeSchema = Schema({
    _id: Schema.Types.ObjectId,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
    status: {
        type: String,
        trim: true,
        enum : ['liked', 'disliked', 'pending'],
        default: 'pending'
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

module.exports = mongoose.model('LikeDisLike', likeDisLikeSchema);