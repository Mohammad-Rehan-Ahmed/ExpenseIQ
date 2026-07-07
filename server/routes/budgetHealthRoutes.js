const express = require("express");
const router = express.Router();

const {
    getBudgetHealth,
} = require("../controllers/budgetHealthController");

router.get("/", getBudgetHealth);

module.exports = router;