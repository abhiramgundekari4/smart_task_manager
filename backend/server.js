const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();


// 🔥 CORS (Frontend allow cheyadaniki)
app.use(cors({
  origin: "*",  // later Vercel URL pettochu
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


// 🔥 BODY PARSER
app.use(express.json());


// 🔹 ROUTES IMPORT
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const profileRoutes = require("./routes/profile");


// 🔹 ROUTES USE
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/profile", profileRoutes);  // 🔥 MUST


// 🔹 ROOT TEST
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});


// 🔹 DB CONNECT (better logging)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => {
    console.error("❌ DB ERROR:", err.message);
    process.exit(1);
  });


// 🔹 SERVER START
const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});