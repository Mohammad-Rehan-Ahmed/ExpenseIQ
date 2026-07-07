import API from "./api";

export const getPrediction = async () => {
    const res = await API.get("/predictions");
    return res.data;
};