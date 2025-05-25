const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware de autenticación

// Registro del usuario
router.post('/registro', async (req, res) => {
    const { nombre, email, contraseña } = req.body;

    // Validaciones basicas
    if (!nombre || !email || !contraseña) {
        return res.status(400).json({ mensaje: "Todos los campos son obligatorios." });
    }

    if (contraseña.length < 6) {
        return res.status(400).json({ mensaje: "La contraseña debe tener al menos 6 caracteres." });
    }

    try {
        // Verifica si el usuario ya existe
        const [existUser] = await db.promise().query(`SELECT * FROM usuarios WHERE email = ?`, [email]);
        if (existUser.length > 0) {
            return res.status(400).json({ mensaje: "El correo ya está registrado." });
        }

        // Encripta la contraseña y guarda el usuario
        const hashContraseña = await bcrypt.hash(contraseña, 10);
        await db.promise().query(`INSERT INTO usuarios (nombre, email, contraseña) VALUES (?, ?, ?)`, [nombre, email, hashContraseña]);

        res.status(201).json({ mensaje: "Usuario registrado con éxito." });
    } catch (error) {
        console.error("Error en el registro:", error);
        res.status(500).json({ mensaje: "Error interno del servidor." });
    }
});

// Inicio de sesion con JWT
router.post('/login', async (req, res) => {
    try {
        const { email, contraseña } = req.body;

        // Verifica si el usuario existe
        const [usuario] = await db.promise().query(`SELECT * FROM usuarios WHERE email = ?`, [email]);
        if (usuario.length === 0) {
            return res.status(400).json({ mensaje: "El usuario no existe." });
        }

        // Valida la contraseña
        const validPassword = await bcrypt.compare(contraseña, usuario[0].contraseña);
        if (!validPassword) {
            return res.status(400).json({ mensaje: "Contraseña incorrecta." });
        }

        // Genera token con JWT
        const token = jwt.sign(
            { id: usuario[0].id, email: usuario[0].email },
            "clave_secreta",
            { expiresIn: "1h" }
        );

        res.json({ mensaje: "Acceso exitoso", token });
    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ mensaje: "Error interno del servidor." });
    }
});

// Ruta protegida para obtener el perfil del usuario autenticado
router.get('/perfil', authMiddleware, async (req, res) => {
    try {
        const [usuario] = await db.promise().query(`SELECT * FROM usuarios WHERE id = ?`, [req.usuario.id]);

        if (usuario.length === 0) {
            return res.status(404).json({ mensaje: "Usuario no encontrado." });
        }

        res.json(usuario[0]); // Envio datos del usuario autenticado
    } catch (error) {
        console.error("Error al obtener perfil:", error);
        res.status(500).json({ mensaje: "Error interno del servidor." });
    }
});

module.exports = router;
