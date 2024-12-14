// routes/currencyRoutes.js
const express = require('express');
const { createCurrency, listCurrencies, modifyExchangeRate } = require('../controllers/currencyController');
const { authenticateUser } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/add', authenticateUser, createCurrency);
router.get('/list', authenticateUser, listCurrencies);
router.put('/update-rate', authenticateUser, modifyExchangeRate);

module.exports = router;
