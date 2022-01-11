const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const friendRequestSchema = Schema({
    _id: Schema.Types.ObjectId,
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    receiver: { type: Schema.Types.ObjectId, ref: 'User' },
    status: {
        type: String,
        trim: true,
        enum : ['accepted', 'rejected', 'pending', 'unfriended', 'blocked', 'hidden'],
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

module.exports = mongoose.model('FriendRequest', friendRequestSchema);