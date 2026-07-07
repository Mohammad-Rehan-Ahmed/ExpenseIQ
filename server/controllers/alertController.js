const Expense = require("../models/Expense");

const getAlerts = async (req, res) => {
    try {

        const expenses = await Expense.find();

        if (expenses.length === 0) {
            return res.json({
                alerts: ["No expenses found."]
            });
        }

        const alerts = [];

        // Total Expense
        const totalExpense = expenses.reduce(
            (sum, expense) => sum + Number(expense.amount),
            0
        );

        // Total Transactions
        const transactionCount = expenses.length;

        // Category Totals
        const categoryTotals = {};

        expenses.forEach((expense) => {
            if (categoryTotals[expense.category]) {
                categoryTotals[expense.category] += Number(expense.amount);
            } else {
                categoryTotals[expense.category] = Number(expense.amount);
            }
        });

        // Rule 1
        if (totalExpense > 50000) {
            alerts.push("🚨 Your total expenses are unusually high this month.");
        }

        // Rule 2
        if (transactionCount < 10) {
            alerts.push("📉 Very few transactions detected. Prediction accuracy may be low.");
        }

        // Rule 3
        Object.entries(categoryTotals).forEach(([category, amount]) => {

            const percentage = (amount / totalExpense) * 100;

            if (percentage >= 80) {
                alerts.push(
                    `⚠ ${category} accounts for ${percentage.toFixed(1)}% of your total spending.`
                );
            }
        });

        // Rule 4
        if (categoryTotals["Food"] && categoryTotals["Food"] < 500) {
            alerts.push("🍽 Food spending is quite low this month.");
        }

        // Rule 5
        if (
            categoryTotals["Entertainment"] &&
            categoryTotals["Entertainment"] > 3000
        ) {
            alerts.push("🎬 Entertainment spending is higher than usual.");
        }

        res.json({
            alerts,
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: "Unable to generate alerts.",
        });

    }
};

module.exports = {
    getAlerts,
};