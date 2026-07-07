import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getBudgetHealth } from "../services/budgetHealthService";

function BudgetHealth() {

    const [health, setHealth] = useState(null);

    useEffect(() => {
        loadHealth();
    }, []);

    const loadHealth = async () => {
        try {
            const data = await getBudgetHealth();
            setHealth(data);
        } catch (err) {
            console.log(err);
        }
    };

    if (!health) {
        return (
            <motion.div
                className="card shadow mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div className="card-body text-center">
                    Loading Budget Health...
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            className="card shadow mt-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{
                scale: 1.01,
                y: -5,
            }}
        >

            <div className="card-body">

                <h3 className="text-center">
                    ❤️ Budget Health Meter
                </h3>

                <hr />

                <motion.h4
                    className={`text-${health.color} text-center`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {health.status}
                </motion.h4>

                <div
                    className="progress"
                    style={{ height: "30px" }}
                >
                    <motion.div
                        className={`progress-bar bg-${health.color}`}
                        role="progressbar"
                        initial={{ width: 0 }}
                        animate={{ width: `${health.percentage}%` }}
                        transition={{ duration: 1 }}
                    >
                        {health.percentage}%
                    </motion.div>
                </div>

                <motion.div
                    className="mt-3 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >

                    <h5>Total Expense</h5>

                    <h4>
                        ₹{health.totalExpense}
                    </h4>

                    <h5 className="mt-3">
                        Monthly Budget
                    </h5>

                    <h4>
                        ₹{health.monthlyBudget}
                    </h4>

                    <p className="mt-3">
                        {health.message}
                    </p>

                </motion.div>

            </div>

        </motion.div>
    );
}

export default BudgetHealth;