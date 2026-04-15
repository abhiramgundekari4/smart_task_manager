const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();

// 🔥 CORS (ONLY ONCE)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 🔥 BODY PARSER
app.use(express.json());

// 🔹 ROUTES IMPORT
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

// 🔹 ROUTES USE
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// ❌ REMOVE THIS (IMPORTANT)
// app.use("/api/assignments", assignmentRoutes);

// 🔹 ROOT TEST
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// 🔹 DB CONNECT
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB ERROR:", err));

// 🔹 SERVER
const PORT = 5002;
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});