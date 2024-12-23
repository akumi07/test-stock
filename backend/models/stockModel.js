const db = require('../db');

const getAllStocks = (callback) => {
    const query = 'SELECT * FROM stocks';
    db.query(query, callback);
};

const addStock = (stock, callback) => {
    const query = 'INSERT INTO stocks (name, ticker, buy_price) VALUES (?, ?, ?)';
    db.query(query, [stock.name, stock.ticker, stock.buy_price], callback);
};

const deleteStock = (id, callback) => {
    const query = 'DELETE FROM stocks WHERE id = ?';
    db.query(query, [id], callback);
};

module.exports = { getAllStocks, addStock, deleteStock };
