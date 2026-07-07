import API from "./api";

export const getBudgetHealth = async () => {
    const res = await API.get("/budget-health");
    return res.data;
};