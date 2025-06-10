// backend/routes/payments.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const admin = require('../middlewares/adminMiddleware');
const Payment = require('../models/payment');

/*
    GET /api/payments/methods
    Lista los métodos de pago (público)
*/
router.get('/methods', async (req, res, next) => {
    try {
        const methods = await Payment.getAllMethods();
        res.json(methods);
    } catch (err) {
        next(err);
    }
});

/*
    POST /api/payments
    Registra un pago realizado (solo usuario logueado)
    Body: { orderId, methodId, status? }
*/
router.post('/', auth, async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { orderId, methodId, status } = req.body;
        await Payment.createPayment({ userId, orderId, methodId, status });
        res.status(201).json({ message: 'Payment recorded.' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
