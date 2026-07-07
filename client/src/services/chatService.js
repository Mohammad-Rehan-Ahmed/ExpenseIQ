import API from "./api";

export const chatWithAI = async (message) => {

    const res = await API.post("/chat", {
        message,
    });

    return res.data;

};