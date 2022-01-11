const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = Schema({
    _id: Schema.Types.ObjectId,
    role: { type: String, required: true }, 
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        default: null,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    userName: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},{timestamps: true });

module.exports = mongoose.model('User', userSchema);