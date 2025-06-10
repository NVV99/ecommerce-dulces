require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./config/db');
const errorHandler = require('./middlewares/errorMiddleware');

app.use(cors());
app.use(express.json());

// Importar rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/contact', require('./routes/contact'));

// Test DB
(async () => {
  try {
    await db.query('SELECT 1');
    console.log('DB connected');
  } catch (err) {
    console.error('DB connection error:', err);
  }
})();

// Test server
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Manejo de errores
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
