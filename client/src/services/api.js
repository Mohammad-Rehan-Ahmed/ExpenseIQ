import axios from "axios";

const API = axios.create({
  baseURL: "https://expenseiq-mqof.onrender.com"
});

export default API;