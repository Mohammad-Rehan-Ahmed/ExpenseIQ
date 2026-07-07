import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import API from "../services/api";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function Charts({ refresh }) {

    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        fetchExpenses();
    }, [refresh]);

    const fetchExpenses = async () => {
        try {
            const res = await API.get("/expenses");
            setExpenses(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Calculate total amount for each category
    const categoryTotals = {};

    expenses.forEach((expense) => {
        if (categoryTotals[expense.category]) {
            categoryTotals[expense.category] += Number(expense.amount);
        } else {
            categoryTotals[expense.category] = Number(expense.amount);
        }
    });

    const data = {
        labels: Object.keys(categoryTotals),

        datasets: [
            {
                label: "Expenses",

                data: Object.values(categoryTotals),

                backgroundColor: [
                    "#4CAF50",
                    "#2196F3",
                    "#FFC107",
                    "#F44336",
                    "#9C27B0",
                    "#00BCD4",
                    "#FF9800",
                    "#8BC34A",
                ],

                borderWidth: 1,
            },
        ],
    };

    return (
    <motion.div
        className="container mt-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
    >

            <div className="card shadow p-4">

                <h3 className="text-center mb-4">
                    Expense Distribution
                </h3>

                <div
                    style={{
                        width: "450px",
                        margin: "auto",
                    }}
                >
                    <Pie data={data} />
                </div>

            </div>

        </motion.div>
    );
}

export default Charts;