import API from "../services/api";

function ExpenseItem({
    expense,
    refreshExpenses,
    setEditingExpense,
}) {

    const handleDelete = async () => {
        try {
            await API.delete(`/expenses/${expense._id}`);
            refreshExpenses();
        } catch (error) {
            console.log(error);
            alert("Error deleting expense");
        }
    };

    return (
        <div className="card shadow-sm mb-3">
            <div className="card-body">

                <h4 className="card-title">
                    {expense.title}
                </h4>

                <p>
                    <strong>Amount:</strong> ₹{expense.amount}
                </p>

                <p>
                    <strong>Category:</strong>{" "}
                    <span className="badge bg-primary">
                        {expense.category}
                    </span>
                </p>

                <p>
                    <strong>Payment:</strong>{" "}
                    <span className="badge bg-success">
                        {expense.paymentMethod}
                    </span>
                </p>

                <p>
                    <strong>Notes:</strong> {expense.notes}
                </p>

                <button
    className="btn btn-warning btn-sm me-2"
    onClick={() => setEditingExpense(expense)}
>
    Edit
</button>

                <button
                    className="btn btn-danger btn-sm"
                    onClick={handleDelete}
                >
                    Delete
                </button>

            </div>
        </div>
    );
}

export default ExpenseItem;