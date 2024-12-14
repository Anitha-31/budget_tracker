// transactionModel.js
const pool = require('../config/db');

const createTransaction = async (userId, amount, category, date, type, description) => {
    const query = `INSERT INTO transactions (user_id, amount, category, date, type, description) 
                   VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const values = [userId, amount, category, date, type, description];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const getTransactionsByUser = async (userId, startDate, endDate) => {
    let query = `SELECT * FROM transactions WHERE user_id = $1`;
    const values = [userId];

    if (startDate && endDate) {
        query += ` AND date BETWEEN $2 AND $3`;
        values.push(startDate, endDate);
    }

    query += ' ORDER BY date DESC';
    const result = await pool.query(query, values);
    return result.rows;
};

module.exports = { createTransaction, getTransactionsByUser };
