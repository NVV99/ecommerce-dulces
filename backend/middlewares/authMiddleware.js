// Middleware de autenticación

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization'); // Obtiene el token
    if (!token) {
        return res.status(401).json({ mensaje: "Acceso denegado. No hay token." });
    }

    try {
        const decoded = jwt.verify(token, "clave_secreta"); // Verifica el token
        req.usuario = decoded; // Guarda el usuario
        next(); // Pasa al siguiente middleware
    } catch (error) {
        res.status(403).json({ mensaje: "Token inválido." });
    }
};

module.exports = authMiddleware;
