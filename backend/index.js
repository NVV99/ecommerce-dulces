const db = require('./config/db');
const express = require('express');
const app = express();
const usuariosRoutes = require('./routes/usuarios');
const productosRoutes = require('./routes/productos');
const pedidosRoutes = require('./routes/pedidos');

// Middleware para procesar JSON
app.use(express.json());

// Importar rutas
app.use('/api/usuarios', usuariosRoutes);

// Registrar rutas
app.use('/api/productos', productosRoutes);

// Registrar rutas
app.use('/api/pedidos', pedidosRoutes); 


// Test de conexión de la base de datos
db.query('SELECT 1', (err, results) => {
    if (err) console.error('Error en la prueba de conexión:', err);
    else console.log('La base de datos está lista');
});

// Test de conexión del backend 
app.get('/api/test', (req, res) => {
    res.json({ message: 'El servidor está funcionando' });
});

// Levantar el servidor
app.listen(5000, () => {
    console.log('Servidor en http://localhost:5000');
});

