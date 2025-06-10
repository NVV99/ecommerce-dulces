const jwt = require('jsonwebtoken');
const User = require('../models/user');
const JWT_SECRET = process.env.JWT_SECRET || 'secretkey123';

/*
  POST /api/auth/register
  Registra un nuevo usuario (solo nombre, email, password, teléfono opcional)
*/
async function register(req, res) {
  const { nombre, email, password, telefono } = req.body;
  if (!nombre || !email || !password) {
    return res.status(400).json({ message: 'Nombre, email y contraseña son obligatorios.' });
  }

  // Comprueba si ya existe un usuario con ese email
  if (await User.findByEmail(email)) {
    return res.status(409).json({ message: 'Este email ya está registrado.' });
  }

  // Crea el usuario en la base de datos
  await User.createUser({ nombre, email, password, telefono });
  res.status(201).json({ message: 'Usuario registrado correctamente.' });
}

/*
  POST /api/auth/login
  Permite login con email o nombre de usuario (identifier) + contraseña
*/
async function login(req, res) {
  const { identifier, password } = req.body;
  if (!identifier || !password) {
    return res.status(400).json({ message: 'Usuario/email y contraseña son obligatorios.' });
  }

  // Intento primero por email
  let user = await User.findByEmail(identifier);
  // Si no existe, intento por nombre de usuario
  if (!user) {
    user = await User.findByUsername(identifier);
  }
  if (!user) {
    return res.status(401).json({ message: 'Credenciales incorrectas.' });
  }

  // Verifico la contraseña
  const valid = await User.verifyPassword(password, user.contraseña);
  if (!valid) {
    return res.status(401).json({ message: 'Credenciales incorrectas.' });
  }

  // Genero un token JWT con id y rol
  const token = jwt.sign(
    { userId: user.id, role: user.tipo },
    JWT_SECRET,
    { expiresIn: '8h' }
  );

  res.json({
    token,
    user: {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      tipo: user.tipo
    }
  });
}

module.exports = {
  register,
  login
};
