// Endpoints para gestionar perfil y contraseña

const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../models/User'); // para findByEmail y verifyPassword

/*
    GET /api/users/me
    Devuelve el perfil del usuario logueado
*/
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const [rows] = await db.query(
            `SELECT id, nombre, email, telefono, tipo, fecha_registro 
             FROM usuarios WHERE id = ?`,
            [userId]
        );
        res.json(rows[0]);
    } catch (err) {
        console.error("Error getting profile:", err);
        res.status(500).json({ message: "Internal server error." });
    }
});

/*
    PUT /api/users/me
    Permite actualizar nombre y teléfono del usuario logueado
*/
router.put('/me', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const { nombre, telefono } = req.body;
        await db.query(
            `UPDATE usuarios SET nombre = ?, telefono = ? WHERE id = ?`,
            [nombre, telefono, userId]
        );
        res.json({ message: "Profile updated successfully." });
    } catch (err) {
        console.error("Error updating profile:", err);
        res.status(500).json({ message: "Internal server error." });
    }
});

/*
    PUT /api/users/me/password
    Permite cambiar la contraseña del usuario logueado
    Requiere enviar: currentPassword, newPassword
*/
router.put('/me/password', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: "Both passwords are required." });
        }
        // Obtengo hash actual
        const user = await User.findByEmail(req.user.email);
        const match = await User.verifyPassword(currentPassword, user.contraseña);
        if (!match) {
            return res.status(401).json({ message: "Current password is incorrect." });
        }
        // Hasheo y actualizo
        const hash = await bcrypt.hash(newPassword, 10);
        await db.query(
            `UPDATE usuarios SET contraseña = ? WHERE id = ?`,
            [hash, userId]
        );
        res.json({ message: "Password updated successfully." });
    } catch (err) {
        console.error("Error changing password:", err);
        res.status(500).json({ message: "Internal server error." });
    }
});

module.exports = router;
