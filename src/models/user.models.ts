import mongoose, { Schema } from "mongoose";
import { validate } from "uuid";

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
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    validate: {
      validator: function (v: string) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: (props: { value: string }) =>
        `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: {
      values: ["user", "admin"],
    },
    default: "user",
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  // updated timestamp
  this.updatedAt = new Date();

  // checking if username or email already exists
  const existingUser = await mongoose.models.User.findOne({
    $or: [{ username: this.username }, { email: this.email }],
  });

  if (existingUser) {
    if (existingUser.username === this.username) {
      next(new Error("Username already exists"));
    }
    if (existingUser.email === this.email) {
      next(new Error("Email already exists"));
    }
  }
  next();
});

export const User = mongoose.model<UserProps>("User", userSchema);
