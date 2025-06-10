// Verifica que la petición trae un JWT válido

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secretkey123';

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Token no proporcionado.' });
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>
    if (!token) {
        return res.status(401).json({ message: 'Token malformado.' });
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        // Añado datos del usuario al req para que los usen las rutas
        req.user = { id: payload.userId, role: payload.role };
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido.' });
    }
};
