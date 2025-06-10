// Asegura que solo los admins puedan acceder

module.exports = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Acceso denegado. Solo admins.' });
    }
    next();
};
