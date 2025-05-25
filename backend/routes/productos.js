const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authMiddleware = require('../middlewares/authMiddleware');

// Obtiene todos los productos
router.get('/', async (req, res) => {
    try {
        const [productos] = await db.promise().query(`SELECT * FROM productos`);
        res.json(productos);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ mensaje: "Error interno del servidor." });
    }
});

// Agrega un producto 
router.post('/', authMiddleware, async (req, res) => {
    const { nombre, descripcion, precio, stock } = req.body;

    if (!nombre || !precio || stock === undefined) {
        return res.status(400).json({ mensaje: "Nombre, precio y stock son obligatorios." });
    }

    try {
        await db.promise().query(
            `INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)`,
            [nombre, descripcion, precio, stock]
        );
        res.status(201).json({ mensaje: "Producto agregado con éxito." });
    } catch (error) {
        console.error("Error al agregar producto:", error);
        res.status(500).json({ mensaje: "Error interno del servidor." });
    }
});

// Edita un producto
router.put('/:id', authMiddleware, async (req, res) => {
    const { nombre, descripcion, precio, stock } = req.body;
    const { id } = req.params;

    try {
        await db.promise().query(
            `UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE id = ?`,
            [nombre, descripcion, precio, stock, id]
        );
        res.json({ mensaje: "Producto actualizado correctamente." });
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).json({ mensaje: "Error interno del servidor." });
    }
});

// Elimina un producto
router.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;

    try {
        await db.promise().query(`DELETE FROM productos WHERE id = ?`, [id]);
        res.json({ mensaje: "Producto eliminado correctamente." });
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).json({ mensaje: "Error interno del servidor." });
    }
});

module.exports = router;
