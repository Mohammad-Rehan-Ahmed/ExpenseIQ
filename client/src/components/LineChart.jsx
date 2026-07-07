import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../services/api";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function LineChart({ refresh }) {

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

    const totals = {};

    expenses.forEach((expense) => {

        const date = new Date(expense.date).toLocaleDateString();

        if (totals[date]) {
            totals[date] += Number(expense.amount);
        } else {
            totals[date] = Number(expense.amount);
        }

    });

    const data = {
        labels: Object.keys(totals),

        datasets: [
            {
                label: "Daily Expenses",

                data: Object.values(totals),

                fill: false,

                borderColor: "#4CAF50",

                tension: 0.3,
            },
        ],
    };

  return (

    <div className="container mt-4">

        <motion.div
            className="card shadow p-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{
                scale: 1.01,
                y: -5
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >

            <h3 className="text-center mb-4">
                Expenses Over Time
            </h3>

            <Line data={data} />

        </motion.div>

    </div>

);

}

export default LineChart;