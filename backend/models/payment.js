// Interacción con tablas metodos_pago y pagos

const db = require('../config/db');

// Listo los métodos de pago disponibles
async function getAllMethods() {
    const [rows] = await db.query('SELECT * FROM metodos_pago');
    return rows;
}

// Creo un registro de pago
async function createPayment({ userId, orderId, methodId, status = 'pendiente' }) {
    await db.query(
        `INSERT INTO pagos (usuario_id, pedido_id, metodo_pago_id, estado)
         VALUES (?, ?, ?, ?)`,
        [userId, orderId, methodId, status]
    );
}

module.exports = {
    getAllMethods,
    createPayment
};
