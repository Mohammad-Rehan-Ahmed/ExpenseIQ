import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import API from "../services/api";
import ExpenseItem from "./ExpenseItem";

function ExpenseList({
    refresh,
    search,
    category,
    paymentMethod,
    fromDate,
    toDate,
    setEditingExpense,
}) {

    const [expenses, setExpenses] = useState([]);

    const fetchExpenses = async () => {
        try {
            const res = await API.get("/expenses");
            setExpenses(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, [refresh]);

    const filteredExpenses = expenses.filter((expense) => {

        const matchesSearch =
            expense.title.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
            category === "All" ||
            expense.category === category;

        const expenseDate = expense.date
            ? new Date(expense.date)
            : null;

        const matchesFromDate =
            !fromDate ||
            (expenseDate &&
                expenseDate >= new Date(fromDate));

        const matchesToDate =
            !toDate ||
            (expenseDate &&
                expenseDate <= new Date(toDate));

        return (
            matchesSearch &&
            matchesCategory &&
            matchesFromDate &&
            matchesToDate
        );

    });

    return (

        <motion.div
            className="container mt-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >

            <h2 className="text-center mb-4 text-white">
    📋 All Expenses
</h2>

            {filteredExpenses.length === 0 ? (

                <motion.p
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    No expenses found.
                </motion.p>

            ) : (

                filteredExpenses.map((expense, index) => (

                    <motion.div
                        key={expense._id}
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.4,
                            delay: index * 0.08,
                        }}
                        whileHover={{
                            scale: 1.01,
                            y: -3,
                        }}
                    >

                        <ExpenseItem
                            expense={expense}
                            refreshExpenses={fetchExpenses}
                            setEditingExpense={setEditingExpense}
                        />

                    </motion.div>

                ))

            )}

        </motion.div>

    );
}

export default ExpenseList;