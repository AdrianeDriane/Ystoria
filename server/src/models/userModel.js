import mongoose from 'mongoose';
import {
  ACCOUNT_STATUS_ACTIVE,
  ACCOUNT_STATUS_ENUM,
} from '../constants/enums.js';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password_hash: {
      type: String,
      required: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    profile_picture: String,
    cover_photo: String,
    bio: String,
    date_of_birth: Date,
    location: String,
    last_login_timestamp: Date,
    account_status: {
      type: String,
      enum: ACCOUNT_STATUS_ENUM,
      default: ACCOUNT_STATUS_ACTIVE,
    },
    security_tokens: {
      verification_token: String,
      password_reset_token: String,
    },
    social_links: {
      twitter: String,
      instagram: String,
    },
    friends_list: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    post_history: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model('User', userSchema);
