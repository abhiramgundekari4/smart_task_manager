const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

// ➕ ADD TASK
router.post("/", auth, async (req, res) => {
  try {
    const { title, type, dueDate } = req.body;

    const task = new Task({
      user: req.user.id,   // 🔥 VERY IMPORTANT
      title,
      type,
      dueDate,
    });

    await task.save();
    res.json(task);

  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// 📥 GET TASKS
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// ✏️ UPDATE TASK
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).send("Not found");

    if (task.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    task.completed = !task.completed;
    await task.save();

    res.json(task);

  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// ❌ DELETE TASK
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).send("Not found");

    if (task.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    await task.deleteOne();

    res.json({ msg: "Deleted" });

  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;