// transactionRoutes.js (updated to include budget tracking middleware)
const express = require('express');
const { addTransaction, getUserTransactions } = require('../controllers/transactionController');
const { authenticateUser } = require('../middlewares/authMiddleware');
const { trackBudgetUsage } = require('../middlewares/budgetMiddleware');

const router = express.Router();

router.post('/add', authenticateUser, trackBudgetUsage, addTransaction);
router.get('/list', authenticateUser, getUserTransactions);

module.exports = router;
