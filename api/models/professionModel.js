const mongoose = require('mongoose');

const professionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    profession: { type: String, required: true },
});

module.exports = mongoose.model('Profession', professionSchema);