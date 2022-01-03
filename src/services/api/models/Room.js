import {model, Schema} from "mongoose";

const MRoom = new Schema({
    _id: false,
    id: {
        type: String,
        unique: true,
        required: true
    }
});

export const Room = model("Room", MRoom);