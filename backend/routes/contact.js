const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const Contact = require('../models/contactMessage');

// Si el usuario está logueado, se asocia userId; si no, nombre y email obligatorios.

router.post('/', async (req, res, next) => {
    try {
        const userId = req.user ? req.user.id : null;
        const { nombre, email, mensaje } = req.body;
        if (!userId && (!nombre || !email)) {
            return res.status(400).json({ message: 'Nombre and email are required for guests.' });
        }
        await Contact.createMessage({ userId, nombre, email, mensaje });
        res.status(201).json({ message: 'Message sent.' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
