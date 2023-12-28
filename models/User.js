const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    "firstName": {
        type: String,
        required: true
    },
    "lastName": {
        type: String,
        required: true
    },
    "emailAddress": {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    "password": {
        type: String,
        required: true,
        minlength: [8, "Password should be at least 8 characters"]
    },
    "phoneNumber": String,
    "userType": String,
},
{
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;