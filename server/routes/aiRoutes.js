const express = require("express");

const router = express.Router();

const {
    analyzeExpenses,
} = require("../controllers/aiController");

router.get("/analyze", analyzeExpenses);

module.exports = router;