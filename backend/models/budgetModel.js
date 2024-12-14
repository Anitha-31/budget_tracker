// models/budgetModel.js
const pool = require('../config/db');

const createBudget = async (userId, category, monthlyBudget) => {
    const query = 'INSERT INTO budgets (user_id, category, monthly_budget, spent) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [userId, category, monthlyBudget, 0];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const getBudgetsByUser = async (userId) => {
    const query = 'SELECT * FROM budgets WHERE user_id = $1';
    const result = await pool.query(query, [userId]);
    return result.rows;
};

const updateSpentAmount = async (budgetId, amount) => {
    const query = 'UPDATE budgets SET spent = spent + $1 WHERE budget_id = $2 RETURNING *';
    const values = [amount, budgetId];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const getBudgetByCategory = async (userId, category) => {
    const query = 'SELECT * FROM budgets WHERE user_id = $1 AND category = $2';
    const result = await pool.query(query, [userId, category]);
    return result.rows[0];
};

module.exports = { createBudget, getBudgetsByUser, updateSpentAmount, getBudgetByCategory };
