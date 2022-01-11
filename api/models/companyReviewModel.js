const mongoose = require('mongoose');

const companyReviewSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    review: { type: String, required: true },
    rating: { type: Number, default: 0 },
});

module.exports = mongoose.model('CompanyReview', companyReviewSchema);