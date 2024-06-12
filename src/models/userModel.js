const mongoose = require("mongoose");
const { Schema } = mongoose;

const subtaskSchema = new Schema(
  {
    subject: { type: String, required: true },
    deadline: { type: Date },
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const taskSchema = new Schema(
  {
    subject: { type: String, required: true },
    deadline: { type: Date },
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
    deleted: { type: Boolean, default: false },
    subtasks: [subtaskSchema],
  },
  { timestamps: true }
);

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    tasks: [taskSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
