// Interacción con la tabla detalles_pedido

const db = require('../config/db');

// Inserto todos los detalles (items) de un pedido
async function addOrderDetails(orderId, items) {
    const values = items.map(item => [
        orderId,
        item.productId,
        item.quantity,
        item.unitPrice
    ]);
    // Estructura multi-insert
    await db.query(
        `INSERT INTO detalles_pedido 
         (pedido_id, producto_id, cantidad, precio_unitario) VALUES ?`,
        [values]
    );
}

// Obtengo los detalles de un pedido concreto
async function getDetailsByOrder(orderId) {
    const [rows] = await db.query(
        `SELECT dp.*, p.nombre, p.imagen
         FROM detalles_pedido dp
         JOIN productos p ON dp.producto_id = p.id
         WHERE dp.pedido_id = ?`,
        [orderId]
    );
    return rows;
}

module.exports = {
    addOrderDetails,
    getDetailsByOrder
};
