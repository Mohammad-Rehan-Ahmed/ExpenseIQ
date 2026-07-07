import ExportPDF from "./components/ExportPDF";
import AIChat from "./components/AIChat";
import BudgetHealth from "./components/BudgetHealth";
import Alerts from "./components/Alerts";
import AIInsights from "./components/AIInsights";
import MonthlySummary from "./components/MonthlySummary";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import Charts from "./components/Charts";
import Dashboard from "./components/Dashboard";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

import "./App.css";
import { useState } from "react";

import {
    FaChartPie,
    FaRobot,
    FaWallet,
    FaFileInvoiceDollar,
} from "react-icons/fa";

function App() {

    const [refresh, setRefresh] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("All");

    const refreshExpenses = () => {
        setRefresh(!refresh);
    };

    return (

        <>

            {/* Navbar */}

            <nav className="navbar navbar-dark px-4 py-3 app-navbar">

                <div className="d-flex align-items-center gap-3">

    <div className="logo-circle">
        💰
    </div>

    <div>

        <h4 className="m-0 text-white">
            ExpenseIQ
        </h4>

        <small className="text-light">
            AI Expense Manager
        </small>

    </div>

</div>

                

            </nav>
<div className="dashboard-header">

    <div>

        <h1 className="hero-title">
    Welcome back 👋
</h1>

<p className="hero-subtitle">
    Track your expenses, analyze spending, and get AI-powered financial insights.
</p>

    </div>

</div>

            <div className="container py-4">

                {/* Search */}

                <div className="card p-4 mb-5">

    <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

            <h4 className="mb-1">
                🔍 Search & Filters
            </h4>

            <small className="text-secondary">
                Quickly find expenses by category, keyword or date.
            </small>

        </div>

    </div>

    <input
        type="text"
        className="form-control mb-4"
        placeholder="Search expense title..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
    />

    <div className="row g-3">

        <div className="col-lg-4">
            <select
                className="form-select"
                value={category}
                onChange={(e)=>setCategory(e.target.value)}
            >
                <option value="All">All Categories</option>
                <option>Food</option>
                <option>Fuel</option>
                <option>Shopping</option>
                <option>Bills</option>
                <option>Travel</option>
            </select>
        </div>

        <div className="col-lg-4">
            <input
                type="date"
                className="form-control"
                value={fromDate}
                onChange={(e)=>setFromDate(e.target.value)}
            />
        </div>

        <div className="col-lg-4">
            <input
                type="date"
                className="form-control"
                value={toDate}
                onChange={(e)=>setToDate(e.target.value)}
            />
        </div>

    </div>

</div>


                <Dashboard refresh={refresh} />

<div className="row mt-4">

    <div className="col-lg-6 mb-4">
        <Charts refresh={refresh} />
    </div>

    <div className="col-lg-6 mb-4">
        <BarChart refresh={refresh} />
    </div>

</div>

<div className="row">

    <div className="col-lg-6 mb-4">
        <LineChart refresh={refresh} />
    </div>

    <div className="col-lg-6 mb-4">
        <MonthlySummary refresh={refresh} />
    </div>

</div>

<AIInsights />

<div className="row mt-4">

    <div className="col-lg-6 mb-4">
        <BudgetHealth />
    </div>

    <div className="col-lg-6 mb-4">
        <Alerts />
    </div>

</div>

<div className="row">

    <div className="col-lg-8 mb-4">
        <AIChat />
    </div>

    <div className="col-lg-4 mb-4">
        <ExportPDF />
    </div>

</div>

                <ExpenseForm
                    refreshExpenses={refreshExpenses}
                    editingExpense={editingExpense}
                    setEditingExpense={setEditingExpense}
                />

                <ExpenseList
                    refresh={refresh}
                    search={search}
                    category={category}
                    paymentMethod={paymentMethod}
                    fromDate={fromDate}
                    toDate={toDate}
                    editingExpense={editingExpense}
                    setEditingExpense={setEditingExpense}
                />

            </div>

        </>

    );

}

export default App;