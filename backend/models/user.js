const db = require('../config/db');
const bcrypt = require('bcrypt');

// Buscar por email
async function findByEmail(email) {
    const [rows] = await db.query(
        'SELECT * FROM usuarios WHERE email = ?',
        [email]
    );
    return rows[0];
}

// Buscar por nombre de usuario
async function findByUsername(username) {
    const [rows] = await db.query(
        'SELECT * FROM usuarios WHERE nombre = ?',
        [username]
    );
    return rows[0];
}

async function createUser({ nombre, email, password, telefono, tipo = 'cliente' }) {
    const hash = await bcrypt.hash(password, 10);
    await db.query(
        'INSERT INTO usuarios (nombre, email, telefono, contraseña, tipo) VALUES (?, ?, ?, ?, ?)',
        [nombre, email, telefono, hash, tipo]
    );
}

async function verifyPassword(plain, hash) {
    return bcrypt.compare(plain, hash);
}

module.exports = {
    findByEmail,
    findByUsername,
    createUser,
    verifyPassword
};
