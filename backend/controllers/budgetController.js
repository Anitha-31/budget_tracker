// controllers/budgetController.js
const { createBudget, getBudgetsByUser, updateSpentAmount, getBudgetByCategory } = require('../models/budgetModel');

const addBudget = async (req, res) => {
    try {
        const userId = req.user.id;
        const { category, monthlyBudget } = req.body;
        const budget = await createBudget(userId, category, monthlyBudget);
        res.status(201).json({ message: 'Budget created successfully', budget });
    } catch (error) {
        res.status(500).json({ message: 'Error creating budget', error });
    }
};

const listBudgets = async (req, res) => {
    try {
        const userId = req.user.id;
        const budgets = await getBudgetsByUser(userId);
        res.json({ budgets });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching budgets', error });
    }
};

const checkBudgetExceedance = async (userId, category, amount) => {
    const budget = await getBudgetByCategory(userId, category);
    if (budget) {
        const updatedBudget = await updateSpentAmount(budget.budget_id, amount);
        if (updatedBudget.spent > updatedBudget.monthly_budget) {
            // Logic for sending notification
            console.warn(`Budget exceeded for category: ${category}`);
        }
    }
};

module.exports = { addBudget, listBudgets, checkBudgetExceedance };
