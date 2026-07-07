import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getAIAnalysis } from "../services/aiService";

function AIInsights() {
    const [advice, setAdvice] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchAdvice = async () => {
        try {
            setLoading(true);

            const data = await getAIAnalysis();
           const parsed = JSON.parse(data.advice);

console.log("Parsed AI Advice:", parsed);

setAdvice(parsed);

           
        } catch (err) {
            console.log(err);
            setAdvice(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdvice();
    }, []);

    return (
        <motion.div
            className="card shadow mt-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <div className="card-body">

                <h3>🤖 AI Financial Advisor</h3>

                <hr />

                {loading ? (

                    <p>Analyzing your expenses...</p>

                ) : advice ? (

                    <div className="row">

                        {/* Spending Summary */}
                        <div className="col-md-6 mb-3">
                            <motion.div
                                className="card border-primary h-100"
                                whileHover={{
                                    scale: 1.03,
                                    y: -5
                                }}
                                transition={{ duration: 0.2 }}
                            >
                              <div className="card-body">
    <h5>📊 Spending Summary</h5>

    {typeof advice.summary === "object" ? (
        <>
            <p>
                <strong>Total Expenses:</strong> ₹
                {advice.summary.totalExpenses}
            </p>

            <p>
                <strong>Categories:</strong>
            </p>

            <ul>
                {Object.entries(advice.summary.categories).map(
                    ([category, amount]) => (
                        <li key={category}>
                            {category}: ₹{amount}
                        </li>
                    )
                )}
            </ul>
        </>
    ) : (
        <p>{advice.summary}</p>
    )}
</div>  
                            </motion.div>
                        </div>

                        {/* Biggest Expense */}
                        <div className="col-md-6 mb-3">
                            <motion.div
                                className="card border-danger h-100"
                                whileHover={{
                                    scale: 1.03,
                                    y: -5
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="card-body">
                                    <h5>⚠ Biggest Expense</h5>
                                   {typeof advice.biggestExpense === "object" ? (
    <>
        <p><strong>Name:</strong> {advice.biggestExpense.name}</p>
        <p><strong>Category:</strong> {advice.biggestExpense.category}</p>
        <p><strong>Amount:</strong> ₹{advice.biggestExpense.amount}</p>
    </>
) : (
    <p>{advice.biggestExpense}</p>
)}
                                </div>
                            </motion.div>
                        </div>

                        {/* Saving Tips */}
                        <div className="col-md-6">
                            <motion.div
                                className="card border-success h-100"
                                whileHover={{
                                    scale: 1.03,
                                    y: -5
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="card-body">
                                    <h5>💡 Saving Tips</h5>

                                    <ul>
                                        {advice.savingTips.map((tip, index) => (
                                            <li key={index}>{tip}</li>
                                        ))}
                                    </ul>

                                </div>
                            </motion.div>
                        </div>

                        {/* Budget Recommendation */}
                        <div className="col-md-6">
                            <motion.div
                                className="card border-warning h-100"
                                whileHover={{
                                    scale: 1.03,
                                    y: -5
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="card-body">
                                    <h5>🎯 Budget Recommendation</h5>

                                    <ul>
                                        {advice.budgetRecommendation.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>

                                </div>
                            </motion.div>
                        </div>

                    </div>

                ) : (

                    <p className="text-danger">
                        Unable to fetch AI advice.
                    </p>

                )}

                <button
                    className="btn btn-primary mt-3"
                    onClick={fetchAdvice}
                >
                    Refresh AI Analysis
                </button>

            </div>
        </motion.div>
    );
}

export default AIInsights;