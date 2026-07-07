import axios from "axios";

const API = "http://localhost:5000/api/ai";

export const getAIAnalysis = async () => {
    const res = await axios.get(`${API}/analyze`);
    return res.data;
};