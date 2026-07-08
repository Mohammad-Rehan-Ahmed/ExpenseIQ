import API from "./api";

export const getAIAnalysis = async () => {
    const res = await API.get("/ai/analyze");
    return res.data;
};