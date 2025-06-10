// Interacción con la tabla mensajes_contacto

const db = require('../config/db');

// Inserto mensaje de contacto
async function createMessage({ userId, nombre, email, mensaje }) {
    await db.query(
        `INSERT INTO mensajes_contacto (usuario_id, nombre, email, mensaje)
         VALUES (?, ?, ?, ?)`,
        [userId || null, nombre, email, mensaje]
    );
}

module.exports = {
    createMessage
};
