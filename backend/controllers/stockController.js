const axios = require("axios");
const stockModel = require("../models/stockModel");

const ALPHA_VANTAGE_API_KEY = "EPOKY8P9PI2MU5S5";
const BASE_URL = "https://www.alphavantage.co/query";

const getStocks = (req, res) => {
    stockModel.getAllStocks((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

const addStock = (req, res) => {
    stockModel.addStock(req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Stock added" });
    });
};

const deleteStock = (req, res) => {
    stockModel.deleteStock(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Stock deleted" });
    });
};

const getStockPrice = async (ticker) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                function: "GLOBAL_QUOTE",
                symbol: ticker,
                apikey: ALPHA_VANTAGE_API_KEY,
            },
        });
        return response.data["Global Quote"]["05. price"];
    } catch (error) {
        console.error("Error fetching stock price:", error.message);
        return null;
    }
};

const calculatePortfolioValue = async (req, res) => {
    try {
        stockModel.getAllStocks(async (err, stocks) => {
            if (err) return res.status(500).json({ error: err.message });

            let totalValue = 0;
            for (const stock of stocks) {
                const price = await getStockPrice(stock.ticker);
                if (price) totalValue += parseFloat(price) * stock.quantity; // Assuming quantity = 1
            }

            res.json({ totalValue, stocks });
        });
    } catch (error) {
        res.status(500).json({ error: "Error calculating portfolio value" });
    }
};

module.exports = { getStocks, addStock, deleteStock, calculatePortfolioValue };
