const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},{
    timeStamp: true
})

const Users = mongoose.model ('userTest', UserSchema);
module.exports = Users;