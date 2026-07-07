import { useEffect, useState } from "react";
import API from "../services/api";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function BarChart({ refresh }) {

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
        if (totals[expense.category]) {
            totals[expense.category] += Number(expense.amount);
        } else {
            totals[expense.category] = Number(expense.amount);
        }
    });

    const data = {
        labels: Object.keys(totals),

        datasets: [
            {
                label: "Expenses",

                data: Object.values(totals),

                backgroundColor: "#2196F3",
            },
        ],
    };

    return (
        <div className="container mt-4">

            <div className="card shadow p-4">

                <h3 className="text-center mb-4 text-dark">
                    Expenses by Category
                </h3>

                <Bar data={data} />

            </div>

        </div>
    );
}

export default BarChart;