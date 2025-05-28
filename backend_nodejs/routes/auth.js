const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

router.post('/signup', async (req, res) => {
  const { nombre, correo, contraseña } = req.body;
  try {
    let usuario = await Usuario.findOne({ correo });
    if (usuario) return res.status(400).json({ msg: 'El usuario ya existe' });

    const hash = await bcrypt.hash(contraseña, 10);
    usuario = new Usuario({ nombre, correo, contraseña: hash });
    await usuario.save();

    res.status(201).json({ msg: 'Usuario registrado correctamente' });
  } catch {
    res.status(500).json({ msg: 'Error al registrar usuario' });
  }
});

router.post('/login', async (req, res) => {
  const { correo, contraseña } = req.body;
  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) return res.status(400).json({ msg: 'Credenciales inválidas' });

    const isMatch = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!isMatch) return res.status(400).json({ msg: 'Credenciales inválidas' });

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, nombre: usuario.nombre });
  } catch {
    res.status(500).json({ msg: 'Error al iniciar sesión' });
  }
});

module.exports = router;
