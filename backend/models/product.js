const db = require('../config/db');

// Obtenemos todos los productos
async function getAllProducts() {
    const [rows] = await db.query('SELECT * FROM productos');
    return rows;
}

// Obtenemos un producto por id
async function getProductById(id) {
    const [rows] = await db.query('SELECT * FROM productos WHERE id = ?', [id]);
    return rows[0];
}

// Añadimos un producto
async function addProduct({ nombre, descripcion, imagen, precio, stock, categoria_id }) {
    await db.query(
        'INSERT INTO productos (nombre, descripcion, imagen, precio, stock, categoria_id) VALUES (?, ?, ?, ?, ?, ?)',
        [nombre, descripcion, imagen, precio, stock, categoria_id]
    );
}

// Editamos un producto
async function updateProduct(id, { nombre, descripcion, imagen, precio, stock, categoria_id }) {
    await db.query(
        'UPDATE productos SET nombre = ?, descripcion = ?, imagen = ?, precio = ?, stock = ?, categoria_id = ? WHERE id = ?',
        [nombre, descripcion, imagen, precio, stock, categoria_id, id]
    );
}

// Eliminamos un producto
async function deleteProduct(id) {
    await db.query('DELETE FROM productos WHERE id = ?', [id]);
}

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
};
