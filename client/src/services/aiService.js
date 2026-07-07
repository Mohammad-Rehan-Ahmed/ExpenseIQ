import axios from "axios";

const API = "https://expenseiq-mqof.onrender.com/api/ai";

export const getAIAnalysis = async () => {
    const res = await axios.get(`${API}/analyze`);
    return res.data;
};