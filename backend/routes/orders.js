// Endpoints para crear y gestionar pedidos

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const Order = require('../models/orders');
const OrderDetail = require('../models/orderDetail');

/*
    POST /api/orders
    Crea un pedido nuevo, con items.
    Request body: { addressId, total, items: [{ productId, quantity, unitPrice }, ...] }
    Solo usuarios logueados.
*/
router.post('/', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const { addressId, total, items } = req.body;

        // Creo el pedido y obtengo su ID
        const orderId = await Order.createOrder(userId, addressId, total);
        // Inserto los detalles (items)
        await OrderDetail.addOrderDetails(orderId, items);

        res.status(201).json({ message: "Order created successfully.", orderId });
    } catch (err) {
        console.error("Error creating order:", err);
        res.status(500).json({ message: "Internal server error." });
    }
});

/*
    GET /api/orders
    Devuelve todos los pedidos del usuario logueado
*/
router.get('/', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.getOrdersByUser(userId);
        res.json(orders);
    } catch (err) {
        console.error("Error getting orders:", err);
        res.status(500).json({ message: "Internal server error." });
    }
});

/*
    GET /api/orders/:id
    Devuelve un pedido concreto y sus detalles
*/
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.getOrderById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }
        // Solo puede ver su propio pedido o un admin
        if (order.usuario_id !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied." });
        }
        const details = await OrderDetail.getDetailsByOrder(orderId);
        res.json({ ...order, items: details });
    } catch (err) {
        console.error("Error getting order detail:", err);
        res.status(500).json({ message: "Internal server error." });
    }
});

/*
    GET /api/orders/all
    Devuelve todos los pedidos (solo admin)
*/
router.get('/all', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const orders = await Order.getAllOrders();
        res.json(orders);
    } catch (err) {
        console.error("Error getting all orders:", err);
        res.status(500).json({ message: "Internal server error." });
    }
});

/*
    PUT /api/orders/:id/status
    Permite al admin actualizar el estado de un pedido
    Body: { status }
*/
router.put('/:id/status', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;
        await Order.updateOrderStatus(orderId, status);
        res.json({ message: "Order status updated." });
    } catch (err) {
        console.error("Error updating order status:", err);
        res.status(500).json({ message: "Internal server error." });
    }
});

module.exports = router;
