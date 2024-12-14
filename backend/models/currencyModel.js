// models/currencyModel.js
const pool = require('../config/db');

const addCurrency = async (currencyCode, exchangeRate) => {
    const query = 'INSERT INTO currencies (currency_code, exchange_rate) VALUES ($1, $2) RETURNING *';
    const values = [currencyCode, exchangeRate];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const getAllCurrencies = async () => {
    const query = 'SELECT * FROM currencies';
    const result = await pool.query(query);
    return result.rows;
};

const getCurrencyByCode = async (currencyCode) => {
    const query = 'SELECT * FROM currencies WHERE currency_code = $1';
    const result = await pool.query(query, [currencyCode]);
    return result.rows[0];
};

const updateExchangeRate = async (currencyCode, exchangeRate) => {
    const query = 'UPDATE currencies SET exchange_rate = $1 WHERE currency_code = $2 RETURNING *';
    const values = [exchangeRate, currencyCode];
    const result = await pool.query(query, values);
    return result.rows[0];
};

module.exports = { addCurrency, getAllCurrencies, getCurrencyByCode, updateExchangeRate };
