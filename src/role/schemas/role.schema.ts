import * as mongoose from 'mongoose';

export const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    description: String,
    slug: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    permissions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Permission"
        }
    ],

}, {timestamps: true});

