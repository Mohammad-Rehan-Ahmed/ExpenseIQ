import requests
import pandas as pd
from sklearn.linear_model import LinearRegression


def predict_next_month():

    # Get expenses from Node.js API
    response = requests.get("http://localhost:5000/api/expenses")

    expenses = response.json()

    if len(expenses) < 2:
        return "Not enough data"

    # Convert to DataFrame
    df = pd.DataFrame(expenses)

    # Convert date field
    df["date"] = pd.to_datetime(df["date"])

    # Extract Month
    df["month"] = df["date"].dt.month

    # Total expense per month
    monthly = df.groupby("month")["amount"].sum().reset_index()

    X = monthly[["month"]]
    y = monthly["amount"]

    # Train model
    model = LinearRegression()
    model.fit(X, y)

    next_month = monthly["month"].max() + 1

    prediction = model.predict([[next_month]])

    # Prevent negative predictions
    predicted_value = max(0, prediction[0])

    return round(float(predicted_value), 2)