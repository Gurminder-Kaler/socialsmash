const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = Schema({
    _id: Schema.Types.ObjectId,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    post: {
        type: String,
        required: true
    },
    typeOfPost: {
        type: String,
        trim: true,
        enum : ['company_post', 'normal_post'],
        default: 'normal_post'
    },
    companyId: {
        type: String,
        default: null
    },
    photos: {
        type: Array,
        default: null
    },
    video: {
        type: Array,
        default: null
    },
    dislikeSwitch: {
        type: Boolean,
        default: 1
    },
    commentSwitch: {
        type: Boolean,
        default: 1
    },
    shareSwitch: {
        type: Boolean,
        default: 1
    },
    visibility: {
        type: String,
        trim: true,
        enum : ['public', 'onlyme', 'onlyfriends'],
        default: 'public'
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

module.exports = mongoose.model('Post', postSchema);