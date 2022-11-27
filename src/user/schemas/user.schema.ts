import * as mongoose from 'mongoose';

export var UserSchema = new mongoose.Schema({

    active: {
        type: Number,
        min: 0,
        default: 0
    },

    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    ],
    image: {
        type: String
    },

    name: {
        type: String
    },

    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String
    },

}, {timestamps: true});

