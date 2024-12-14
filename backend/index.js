const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const currencyRoutes = require('./routes/currencyRoutes');
const reportRoutes = require('./routes/reportRoutes');


dotenv.config();
const app = express();

// Middleware
app.use(bodyParser.json());
//app.use(express.json());
app.use(express.static('public'));
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/currency', currencyRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});