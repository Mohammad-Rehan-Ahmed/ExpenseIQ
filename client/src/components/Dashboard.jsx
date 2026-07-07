import { motion } from "framer-motion";
import { getPrediction } from "../services/predictionService";
import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard({ refresh }) {

    const [expenses, setExpenses] = useState([]);
    const [prediction, setPrediction] = useState(null);

    useEffect(() => {
        fetchExpenses();
    }, [refresh]);

    const fetchExpenses = async () => {
        try {
            const res = await API.get("/expenses");
            setExpenses(res.data);

            const predictionData = await getPrediction();
            setPrediction(predictionData.predicted_expense);

        } catch (error) {
            console.log(error);
        }
    };

    const totalExpense = expenses.reduce(
        (sum, expense) => sum + Number(expense.amount),
        0
    );

    const totalTransactions = expenses.length;

    const averageExpense =
        totalTransactions > 0
            ? (totalExpense / totalTransactions).toFixed(2)
            : 0;

    const categoryTotals = {};

    expenses.forEach((expense) => {

        if (categoryTotals[expense.category]) {
            categoryTotals[expense.category] += Number(expense.amount);
        } else {
            categoryTotals[expense.category] = Number(expense.amount);
        }

    });

    return (

        <motion.div
            className="row g-4 mb-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .6 }}
        >

            {/* Total Expense */}

            <div className="col-lg-3 col-md-6">

                <motion.div
                    className="card dashboard-card text-center"
                    whileHover={{ scale: 1.05, y: -8 }}
                >

                    <div className="card-body">

                        <div className="dashboard-icon bg-danger">
                            💰
                        </div>

                        <h6 className="mt-3 text-dark">
                            TOTAL EXPENSE
                        </h6>

                        <h2 className="text-danger">
                            ₹{totalExpense}
                        </h2>

                    </div>

                </motion.div>

            </div>

            {/* Prediction */}

            <div className="col-lg-3 col-md-6">

                <motion.div
                    className="card dashboard-card text-center"
                    whileHover={{ scale: 1.05, y: -8 }}
                >

                    <div className="card-body">

                        <div className="dashboard-icon bg-warning">
                            🔮
                        </div>

                        <h6 className="mt-3 text-dark">
                            PREDICTION
                        </h6>

                        <h2 className="text-warning">

                            {prediction !== null
                                ? `₹${prediction}`
                                : "..."}

                        </h2>

                    </div>

                </motion.div>

            </div>

            {/* Transactions */}

            <div className="col-lg-3 col-md-6">

                <motion.div
                    className="card dashboard-card text-center"
                    whileHover={{ scale: 1.05, y: -8 }}
                >

                    <div className="card-body">

                        <div className="dashboard-icon bg-primary">
                            📄
                        </div>

                        <h6 className="mt-3 text-dark">
                            TRANSACTIONS
                        </h6>

                        <h2 className="text-info">
                            {totalTransactions}
                        </h2>

                    </div>

                </motion.div>

            </div>

            {/* Average */}

            <div className="col-lg-3 col-md-6">

                <motion.div
                    className="card dashboard-card text-center"
                    whileHover={{ scale: 1.05, y: -8 }}
                >

                    <div className="card-body">

                        <div className="dashboard-icon bg-success">
                            📈
                        </div>

                        <h6 className="mt-3 text-dark">
                            AVERAGE
                        </h6>

                        <h2 className="text-success">
                            ₹{averageExpense}
                        </h2>

                    </div>

                </motion.div>

            </div>

            {/* Category Cards */}

            {Object.entries(categoryTotals).map(([category, total]) => (

                <div
                    className="col-lg-3 col-md-6"
                    key={category}
                >

                    <motion.div
                        className="card dashboard-card text-center"
                        whileHover={{
                            scale: 1.04,
                            y: -6,
                        }}
                    >

                        <div className="card-body">

                            <div className="dashboard-icon bg-secondary">

                                📂

                            </div>

                            <h6 className="mt-3 text-dark">

                                {category.toUpperCase()}

                            </h6>

                            <h2>

                                ₹{total}

                            </h2>

                        </div>

                    </motion.div>

                </div>

            ))}

        </motion.div>

    );

}

export default Dashboard;