const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Middleware de autenticación (comprueba que el usuario está logueado)
const authMiddleware = require('../middlewares/authMiddleware');
// Middleware de autorización (comprueba que el usuario es admin)
const adminMiddleware = require('../middlewares/adminMiddleware');

/*
    RUTA: GET /api/productos
    Devuelve todos los productos de la base de datos.
    No requiere autenticación.
*/
router.get('/', async (req, res) => {
    try {
        // Hago la consulta para obtener todos los productos
        const [productos] = await db.query(`SELECT * FROM productos`);
        res.json(productos);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ mensaje: "Error interno del servidor." });
    }
});

/*
    RUTA: GET /api/productos/:id
    Devuelve un producto concreto por su id.
    No requiere autenticación.
*/
router.get('/:id', async (req, res) => {
    try {
        // Busco el producto por su id en la base de datos
        const [productos] = await db.query(`SELECT * FROM productos WHERE id = ?`, [req.params.id]);
        if (!productos.length) {
            // Si no existe, devuelvo error 404
            return res.status(404).json({ mensaje: "Producto no encontrado." });
        }
        // Devuelvo el producto encontrado
        res.json(productos[0]);
    } catch (error) {
        console.error("Error al obtener producto:", error);
        res.status(500).json({ mensaje: "Error interno del servidor." });
    }
});

/*
    RUTA: POST /api/productos
    Permite crear un nuevo producto.
    Solo accesible para administradores.
    El middleware authMiddleware verifica si el usuario está logueado,
    y adminMiddleware comprueba si es admin.
*/
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
    // Obtengo los datos enviados en el cuerpo de la petición
    const { nombre, descripcion, precio, stock, imagen, categoria_id } = req.body;

    // Compruebo que todos los campos necesarios están presentes
    if (!nombre || !precio || stock === undefined || !imagen || !categoria_id) {
        return res.status(400).json({ mensaje: "Faltan campos obligatorios." });
    }

    try {
        // Inserto el producto en la base de datos
        await db.query(
            `INSERT INTO productos (nombre, descripcion, imagen, precio, stock, categoria_id) VALUES (?, ?, ?, ?, ?, ?)`,
            [nombre, descripcion, imagen, precio, stock, categoria_id]
        );
        res.status(201).json({ mensaje: "Producto agregado con éxito." });
    } catch (error) {
        console.error("Error al agregar producto:", error);
        res.status(500).json({ mensaje: "Error interno del servidor." });
    }
});

/*
    RUTA: PUT /api/productos/:id
    Permite editar los datos de un producto concreto.
    Solo accesible para administradores.
*/
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
    const { nombre, descripcion, precio, stock, imagen, categoria_id } = req.body;
    const { id } = req.params;

    try {
        // Actualizo el producto con los nuevos datos
        await db.query(
            `UPDATE productos SET nombre = ?, descripcion = ?, imagen = ?, precio = ?, stock = ?, categoria_id = ? WHERE id = ?`,
            [nombre, descripcion, imagen, precio, stock, categoria_id, id]
        );
        res.json({ mensaje: "Producto actualizado correctamente." });
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).json({ mensaje: "Error interno del servidor." });
    }
});

/*
    RUTA: DELETE /api/productos/:id
    Permite eliminar un producto concreto.
    Solo accesible para administradores.
*/
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
    const { id } = req.params;

    try {
        // Elimino el producto de la base de datos
        await db.query(`DELETE FROM productos WHERE id = ?`, [id]);
        res.json({ mensaje: "Producto eliminado correctamente." });
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).json({ mensaje: "Error interno del servidor." });
    }
});

// Exporto el router para poder usarlo en el archivo principal
module.exports = router;
