const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authMiddleware = require('../middlewares/authMiddleware'); 

// Obtien todos los pedidos del usuario
router.get('/', authMiddleware, async (req, res) => {
    try {
        const [pedidos] = await db.promise().query(
            `SELECT * FROM pedidos WHERE usuario_id = ?`, 
            [req.usuario.id]
        );

        for (let pedido of pedidos) {
            const [productos] = await db.promise().query(
                `SELECT p.nombre, p.precio, dp.cantidad, dp.precio_unitario
                 FROM detalles_pedido dp 
                 JOIN productos p ON dp.producto_id = p.id 
                 WHERE dp.pedido_id = ?`,
                [pedido.id]
            );
            pedido.productos = productos;
        }

        res.json(pedidos);
    } catch (error) {
        console.error("Error al obtener pedidos:", error);
        res.status(500).json({ mensaje: "Error interno del servidor." });
    }
});

// Crea un pedido con productos
router.post('/', authMiddleware, async (req, res) => {
    const { total, productos } = req.body;

    if (!total || !productos || productos.length === 0) {
        return res.status(400).json({ mensaje: "El total y los productos son obligatorios." });
    }

    try {
        // Crea el pedido
        const [pedido] = await db.promise().query(
            `INSERT INTO pedidos (usuario_id, total) VALUES (?, ?)`,
            [req.usuario.id, total]
        );

        const pedidoId = pedido.insertId;

        // Agrega los productos a detalles_pedido
        for (let producto of productos) {
            await db.promise().query(
                `INSERT INTO detalles_pedido (pedido_id, producto_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)`,
                [pedidoId, producto.id, producto.cantidad, producto.precio_unitario]
            );
        }

        res.status(201).json({ mensaje: "Pedido registrado con éxito.", pedidoId });
    } catch (error) {
        console.error("Error al registrar pedido:", error);
        res.status(500).json({ mensaje: "Error interno del servidor." });
    }
});

// Actualiza el estado de un pedido
router.put('/:id', authMiddleware, async (req, res) => {
    const { estado } = req.body;
    const { id } = req.params;

    if (!["pendiente", "enviado", "completado"].includes(estado)) {
        return res.status(400).json({ mensaje: "Estado inválido." });
    }

    try {
        await db.promise().query(
            `UPDATE pedidos SET estado = ? WHERE id = ? AND usuario_id = ?`,
            [estado, id, req.usuario.id]
        );
        res.json({ mensaje: "Pedido actualizado correctamente." });
    } catch (error) {
        console.error("Error al actualizar pedido:", error);
        res.status(500).json({ mensaje: "Error interno del servidor." });
    }
});

module.exports = router;
