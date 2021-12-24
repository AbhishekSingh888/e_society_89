const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    }, 
    password: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String, 
        required: true,
        unique: true
    },
    followers: [{
        type: String
    }]
})

module.exports = mongoose.model('user', UserSchema);