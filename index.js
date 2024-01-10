const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { signUp, login, verifyEmail } = require('./controllers/authController');
const { addCustomer, getCustomers } = require('./controllers/customerController');
const { authenticateToken } = require('./middlewares/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://your-mongo-db-url', { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.post('/api/signup', signUp);
app.post('/api/login', login);
app.get('/api/verify-email/:token', verifyEmail);

app.post('/api/customers', authenticateToken, addCustomer);
app.get('/api/customers', authenticateToken, getCustomers);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
