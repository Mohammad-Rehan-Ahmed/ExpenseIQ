const dotenv = require("dotenv");
dotenv.config();
console.log("PORT =", process.env.PORT);
console.log("MONGO_URI =", process.env.MONGO_URI);
console.log("GROQ_API_KEY =", process.env.GROQ_API_KEY);

const connectDB = require("./config/db");
const app = require("./app");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
};

startServer();