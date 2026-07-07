import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import API from "../services/api";

function ExpenseForm({
    refreshExpenses,
    editingExpense,
    setEditingExpense,
}) {

    const [expense, setExpense] = useState({
        title: "",
        amount: "",
        category: "",
        paymentMethod: "Cash",
        date: new Date().toISOString().split("T")[0],
        notes: "",
    });

    useEffect(() => {
        if (editingExpense) {
            setExpense({
                title: editingExpense.title,
                amount: editingExpense.amount,
                category: editingExpense.category,
                paymentMethod: editingExpense.paymentMethod,
                date: editingExpense.date
                    ? editingExpense.date.split("T")[0]
                    : new Date().toISOString().split("T")[0],
                notes: editingExpense.notes,
            });
        }
    }, [editingExpense]);

    const handleChange = (e) => {
        setExpense({
            ...expense,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (editingExpense) {

                await API.put(`/expenses/${editingExpense._id}`, expense);
                setEditingExpense(null);

            } else {

                await API.post("/expenses", expense);

            }

            refreshExpenses();

            setExpense({
                title: "",
                amount: "",
                category: "",
                paymentMethod: "Cash",
                date: new Date().toISOString().split("T")[0],
                notes: "",
            });

        } catch (error) {

            console.log(error);
            alert("Error adding expense");

        }
    };

    return (

        <div className="container mt-4">

            <motion.div
                className="card shadow p-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{
                    scale: 1.01,
                    y: -5,
                }}
            >

                <h3 className="mb-4 text-center">
                    {editingExpense ? "Edit Expense" : "Add New Expense"}
                </h3>

                <form onSubmit={handleSubmit}>

                    <div className="row">

                        <div className="col-md-3 mb-3">
                            <motion.input
                                whileFocus={{ scale: 1.02 }}
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={expense.title}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="col-md-2 mb-3">
                            <motion.input
                                whileFocus={{ scale: 1.02 }}
                                type="number"
                                name="amount"
                                placeholder="Amount"
                                value={expense.amount}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="col-md-2 mb-3">
                            <motion.input
                                whileFocus={{ scale: 1.02 }}
                                type="text"
                                name="category"
                                placeholder="Category"
                                value={expense.category}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="col-md-2 mb-3">
                            <motion.select
                                whileFocus={{ scale: 1.02 }}
                                name="paymentMethod"
                                value={expense.paymentMethod}
                                onChange={handleChange}
                                className="form-select"
                            >
                                <option>Cash</option>
                                <option>UPI</option>
                                <option>Card</option>
                            </motion.select>
                        </div>

                        <div className="col-md-3 mb-3">
                            <motion.input
                                whileFocus={{ scale: 1.02 }}
                                type="date"
                                name="date"
                                value={expense.date}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="col-md-12 mb-3">
                            <motion.input
                                whileFocus={{ scale: 1.02 }}
                                type="text"
                                name="notes"
                                placeholder="Notes"
                                value={expense.notes}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>

                    </div>

                    <div className="text-center">

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn btn-primary px-5"
                        >
                            {editingExpense ? "Update Expense" : "Add Expense"}
                        </motion.button>

                        {editingExpense && (

                            <motion.button
                                type="button"
                                className="btn btn-secondary ms-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    setEditingExpense(null);

                                    setExpense({
                                        title: "",
                                        amount: "",
                                        category: "",
                                        paymentMethod: "Cash",
                                        date: new Date().toISOString().split("T")[0],
                                        notes: "",
                                    });
                                }}
                            >
                                Cancel
                            </motion.button>

                        )}

                    </div>

                </form>

            </motion.div>

        </div>

    );
}

export default ExpenseForm;