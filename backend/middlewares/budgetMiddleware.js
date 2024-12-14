// middlewares/budgetMiddleware.js
const { checkBudgetExceedance } = require('../controllers/budgetController');

const trackBudgetUsage = async (req, res, next) => {
    try {
        const { category, amount } = req.body;
        const userId = req.user.id;
        await checkBudgetExceedance(userId, category, amount);
        next();
    } catch (error) {
        res.status(500).json({ message: 'Error tracking budget usage', error });
    }
};

module.exports = { trackBudgetUsage };
