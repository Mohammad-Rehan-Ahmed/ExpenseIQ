const axios = require("axios");

const getPrediction = async (req, res) => {
    try {

        const response = await axios.get("http://127.0.0.1:8000/predict");

        res.json(response.data);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: "Prediction service unavailable",
        });

    }
};

module.exports = {
    getPrediction,
};