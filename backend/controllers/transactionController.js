// transactionController.js
const { createTransaction, getTransactionsByUser } = require('../models/transactionModel');

const { getCurrencyByCode } = require('../models/currencyModel');

const addTransaction = async (req, res) => {
    try {
        const { amount, category, date, type, description, currencyCode } = req.body;
        const userId = req.user.id;

        const currency = await getCurrencyByCode(currencyCode);
        if (!currency) {
            return res.status(400).json({ message: 'Invalid currency code' });
        }

        const convertedAmount = amount * currency.exchange_rate;
        const transaction = await createTransaction(userId, convertedAmount, category, date, type, description);
        res.status(201).json({ message: 'Transaction added successfully', transaction });
    } catch (error) {
        res.status(500).json({ message: 'Error adding transaction', error });
    }
};

const getUserTransactions = async (req, res) => {
    try {
        const userId = req.user.id;
        const { start_date, end_date } = req.query;

        const transactions = await getTransactionsByUser(userId, start_date, end_date);
        res.status(200).json({ transactions });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transactions', error });
    }
};

module.exports = { addTransaction, getUserTransactions };
