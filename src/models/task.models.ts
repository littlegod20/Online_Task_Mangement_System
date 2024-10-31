import mongoose, { Schema } from "mongoose";

const taskSchema: Schema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: {
      values: ["pending", "in-progress", "completed"],
    },
    default: "pending",
    required: true,
  },
  dueDate: {
    type: Date,
    // required: true,
  },
  userId: {
    type: String,
  },
  createdAt: Date,
  updatedAt: Date,
});

taskSchema.pre("save", function () {
  this.updateAt = new Date();
});

export const Task = mongoose.model("Task", taskSchema);
