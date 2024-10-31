import mongoose, { Schema } from "mongoose";

export interface UserProps {
  username: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema = new Schema({
  id: String,
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: {
      values: ["user", "admin"],
      message: "{VALUE} is not a valid role",
    },
    default: "user",
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

userSchema.pre("save", function () {
  this.updatedAt = new Date();
});

export const User = mongoose.model<UserProps>("User", userSchema);
