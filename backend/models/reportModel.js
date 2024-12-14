// models/reportModel.js
const pool = require('../config/db');

const getSpendingByCategory = async (userId) => {
    const query = `
        SELECT category, SUM(amount) as total_spent
        FROM transactions
        WHERE user_id = $1
        GROUP BY category
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
};

const getMonthlySpending = async (userId, month, year) => {
    const query = `
        SELECT category, SUM(amount) as total_spent
        FROM transactions
        WHERE user_id = $1 AND EXTRACT(MONTH FROM date) = $2 AND EXTRACT(YEAR FROM date) = $3
        GROUP BY category
    `;
    const result = await pool.query(query, [userId, month, year]);
    return result.rows;
};

module.exports = { getSpendingByCategory, getMonthlySpending };
