const mongoose = require("mongoose");

const Room = new mongoose.Schema({
    roomId: {
        type: String,
        unique: true,
        required: true
    }
});

module.exports = mongoose.model("Room", Room);