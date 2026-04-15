const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,

  type: {
    type: String,
    default: "task"
  },

  completed: {
    type: Boolean,
    default: false
  },

  priority: {
    type: String,
    default: "low"
  },

  dueDate: Date
});

module.exports = mongoose.model("Task", TaskSchema);