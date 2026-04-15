const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

// ADD TASK
router.post("/", auth, async (req, res) => {
  const { title, type, priority, dueDate } = req.body;

  const task = new Task({
    user: req.user.id,
    title,
    type: type ? type.toLowerCase().trim() : "task",
    priority,
    dueDate
  });

  await task.save();
  res.json(task);
});

// GET TASKS
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

// TOGGLE COMPLETE
router.put("/:id", auth, async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.completed = !task.completed;
  await task.save();
  res.json(task);
});

module.exports = router;