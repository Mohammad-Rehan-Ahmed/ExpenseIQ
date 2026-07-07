const Expense = require("../models/Expense");

const getBudgetHealth = async (req, res) => {
    try {

        const expenses = await Expense.find();

        const totalExpense = expenses.reduce(
            (sum, expense) => sum + Number(expense.amount),
            0
        );

        // Demo monthly budget
        const monthlyBudget = 150000;

        const percentage = Math.min(
            Math.round((totalExpense / monthlyBudget) * 100),
            100
        );

        let status = "";
        let color = "";
        let message = "";

        if (percentage <= 50) {
            status = "Excellent";
            color = "success";
            message = "You're managing your expenses very well.";
        }
        else if (percentage <= 70) {
            status = "Good";
            color = "primary";
            message = "Your spending is under control.";
        }
        else if (percentage <= 90) {
            status = "Warning";
            color = "warning";
            message = "You're approaching your monthly budget.";
        }
        else {
            status = "Danger";
            color = "danger";
            message = "You're overspending this month.";
        }

        res.json({
            totalExpense,
            monthlyBudget,
            percentage,
            status,
            color,
            message,
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: "Budget health calculation failed",
        });

    }
};

module.exports = {
    getBudgetHealth,
};