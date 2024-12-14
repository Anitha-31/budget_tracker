// controllers/currencyController.js
const { addCurrency, getAllCurrencies, getCurrencyByCode, updateExchangeRate } = require('../models/currencyModel');

const createCurrency = async (req, res) => {
    try {
        const { currencyCode, exchangeRate } = req.body;
        const currency = await addCurrency(currencyCode, exchangeRate);
        res.status(201).json({ message: 'Currency added successfully', currency });
    } catch (error) {
        res.status(500).json({ message: 'Error adding currency', error });
    }
};

const listCurrencies = async (req, res) => {
    try {
        const currencies = await getAllCurrencies();
        res.json({ currencies });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching currencies', error });
    }
};

const modifyExchangeRate = async (req, res) => {
    try {
        const { currencyCode, exchangeRate } = req.body;
        const updatedCurrency = await updateExchangeRate(currencyCode, exchangeRate);
        res.json({ message: 'Exchange rate updated successfully', updatedCurrency });
    } catch (error) {
        res.status(500).json({ message: 'Error updating exchange rate', error });
    }
};

module.exports = { createCurrency, listCurrencies, modifyExchangeRate };
