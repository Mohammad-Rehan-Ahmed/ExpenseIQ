const Groq = require("groq-sdk");
const Expense = require("../models/Expense");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const chatWithAI = async (req, res) => {

    try {

        const { message } = req.body;

        const expenses = await Expense.find();

        const expenseText = expenses.map(expense =>
            `${expense.title} | ${expense.category} | ₹${expense.amount}`
        ).join("\n");

        const prompt = `
You are an expert personal finance advisor.

These are the user's expenses:

${expenseText}

The user asks:

${message}

Answer in less than 150 words.
Give practical financial advice.
`;

        const completion = await groq.chat.completions.create({
            model: "openai/gpt-oss-20b",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        res.json({
            reply: completion.choices[0].message.content,
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: "Chat failed",
        });

    }

};

module.exports = {
    chatWithAI,
};