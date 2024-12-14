// routes/reportRoutes.js
const express = require('express');
const { generateCategoryReport, generateMonthlyReport } = require('../controllers/reportController');
const { authenticateUser } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/category', authenticateUser, generateCategoryReport);
router.get('/monthly', authenticateUser, generateMonthlyReport);

module.exports = router;
