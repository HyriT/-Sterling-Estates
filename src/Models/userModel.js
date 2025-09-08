import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    avatar: {
      type: String,
      default: '', 
    },
    role: {
      type: String,
      enum: ["super_admin", "moderator", "agent", "user"], 
      default: "user", 
    },
    isActive: {
      type: Boolean,
      default: true, 
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true, 
  }
);

const User = mongoose.model('User', userSchema);

export default User;
