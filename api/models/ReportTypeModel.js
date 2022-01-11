const mongoose = require('mongoose');

const reportTypeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    data: { type: String, required: true },
    status: { type: Boolean, default: true },
});

module.exports = mongoose.model('ReportType', reportTypeSchema);