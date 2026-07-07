from fastapi import FastAPI
from model import predict_next_month

app = FastAPI()


@app.get("/")
def home():
    return {
        "message": "ExpenseIQ AI API is running 🚀"
    }


@app.get("/predict")
def predict():
    return {
        "predicted_expense": predict_next_month()
    }