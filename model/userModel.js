const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    // This is the structure of the document
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
    },
    jobTitle: {
        type: String,
    },
},
    { timestamps: true }
);

const User = mongoose.model("userModel", userSchema);

module.exports = {
    User,
}