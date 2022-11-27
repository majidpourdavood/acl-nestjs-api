import * as mongoose from 'mongoose';

export const PermissionSchema = new mongoose.Schema({
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
}, {timestamps: true});

