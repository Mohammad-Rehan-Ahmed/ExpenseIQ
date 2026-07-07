import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import API from "../services/api";

function MonthlySummary({ refresh }) {

    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        fetchExpenses();
    }, [refresh]);

    const fetchExpenses = async () => {
        try {
            const res = await API.get("/expenses");
            setExpenses(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const monthlyTotals = {};

    expenses.forEach((expense) => {

        const month = new Date(expense.date).toLocaleString(
            "default",
            {
                month: "long",
                year: "numeric",
            }
        );

        if (monthlyTotals[month]) {
            monthlyTotals[month] += Number(expense.amount);
        } else {
            monthlyTotals[month] = Number(expense.amount);
        }

    });

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
                    📅 Monthly Expense Summary
                </h3>

                <table className="table table-bordered table-hover">

                    <thead>

                        <tr>
                            <th>Month</th>
                            <th>Total Expense</th>
                        </tr>

                    </thead>

                    <tbody>

                        {Object.entries(monthlyTotals).map(
                            ([month, total]) => (

                                <motion.tr
                                    key={month}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4 }}
                                    whileHover={{
                                        backgroundColor: "#f8f9fa"
                                    }}
                                >

                                    <td>{month}</td>

                                    <td>₹{total}</td>

                                </motion.tr>

                            )
                        )}

                    </tbody>

                </table>

            </motion.div>

        </div>

    );

}

export default MonthlySummary;