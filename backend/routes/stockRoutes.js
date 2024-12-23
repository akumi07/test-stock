const express = require('express');
const {
  getStocks,
  addStock,
  deleteStock,
  calculatePortfolioValue,
} = require('../controllers/stockController');

const router = express.Router();

// Define the POST route for adding a new stock
router.post('/stocks', addStock);

// You can also define other routes here
router.get('/stocks', getStocks);
router.delete('/stocks/:id', deleteStock);
router.get('/portfolio-value', calculatePortfolioValue);

module.exports = router;
