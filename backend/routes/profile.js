const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

// 📥 GET PROFILE
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// ✏️ UPDATE PROFILE
router.put("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.name = req.body.name || user.name;
    user.course = req.body.course || user.course;
    user.year = req.body.year || user.year;
    user.branch = req.body.branch || user.branch;
    user.attendance = req.body.attendance || user.attendance;

    await user.save();
    res.json(user);

  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;