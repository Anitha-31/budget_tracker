// routes/budgetRoutes.js
const express = require('express');
const { addBudget, listBudgets } = require('../controllers/budgetController');
const { authenticateUser } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/add', authenticateUser, addBudget);
router.get('/list', authenticateUser, listBudgets);

module.exports = router;
