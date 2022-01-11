const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const companyFollowSchema = Schema({
    _id: Schema.Types.ObjectId,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    company: { type: Schema.Types.ObjectId, ref: 'Company' },
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

module.exports = mongoose.model('CompanyFollow', companyFollowSchema);