const Groq = require("groq-sdk");
const Expense = require("../models/Expense");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const analyzeExpenses = async (req, res) => {
    try {

        const expenses = await Expense.find();

        if (expenses.length === 0) {
            return res.json({
                advice: "No expenses found to analyze."
            });
        }

        const expenseText = expenses.map(expense =>
            `${expense.title} | ${expense.category} | ₹${expense.amount}`
        ).join("\n");

    const prompt = `
You are an AI financial advisor.

Analyze these expenses:

${expenseText}

Return ONLY valid JSON.

Format:

{
  "summary": "",
  "biggestExpense": "",
  "savingTips": [
    "",
    "",
    ""
  ],
  "budgetRecommendation": [
    "",
    "",
    ""
  ]
}

Do not write markdown.
Do not use code blocks.
Return JSON only.
`;    

        const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        res.json({
            advice: completion.choices[0].message.content,
        });

    } catch (err) {
       console.error("Groq Error:");
console.error(err);

if (err.response) {
    console.error(err.response.data);
}

        res.status(500).json({
            error: "AI analysis failed",
        });
    }
};

module.exports = {
    analyzeExpenses,
};