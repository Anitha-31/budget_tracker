// controllers/reportController.js
const { getSpendingByCategory, getMonthlySpending } = require('../models/reportModel');

const generateCategoryReport = async (req, res) => {
    try {
        const userId = req.user.id;
        const spendingByCategory = await getSpendingByCategory(userId);
        res.json({ message: 'Spending by category retrieved successfully', spendingByCategory });
    } catch (error) {
        res.status(500).json({ message: 'Error generating category report', error });
    }
};

const generateMonthlyReport = async (req, res) => {
    try {
        const userId = req.user.id;
        const { month, year } = req.query;
        const monthlySpending = await getMonthlySpending(userId, month, year);
        res.json({ message: 'Monthly spending report retrieved successfully', monthlySpending });
    } catch (error) {
        res.status(500).json({ message: 'Error generating monthly report', error });
    }
};

module.exports = { generateCategoryReport, generateMonthlyReport };
