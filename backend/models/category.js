// Interacción con la tabla categorias

const db = require('../config/db');

// Listo todas las categorías
async function getAllCategories() {
    const [rows] = await db.query('SELECT * FROM categorias');
    return rows;
}

// Obtengo una categoría por ID
async function getCategoryById(id) {
    const [rows] = await db.query('SELECT * FROM categorias WHERE id = ?', [id]);
    return rows[0];
}

// Creo una nueva categoría
async function createCategory({ nombre, descripcion }) {
    await db.query(
        'INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)',
        [nombre, descripcion]
    );
}

// Actualizo una categoría
async function updateCategory(id, { nombre, descripcion }) {
    await db.query(
        'UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?',
        [nombre, descripcion, id]
    );
}

// Elimino una categoría
async function deleteCategory(id) {
    await db.query('DELETE FROM categorias WHERE id = ?', [id]);
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
