const express = require("express");
const cors = require("cors");

const expenseRoutes = require("./routes/expenseRoutes");
const aiRoutes = require("./routes/aiRoutes");
const budgetHealthRoutes = require("./routes/budgetHealthRoutes");
const chatRoutes = require("./routes/chatRoutes");
const predictionRoutes = require("./routes/predictionRoutes");
const alertRoutes = require("./routes/alertRoutes");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/expenses", expenseRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/budget-health", budgetHealthRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/predictions", predictionRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "ExpenseIQ Backend is Running 🚀",
  });
});

module.exports = app;