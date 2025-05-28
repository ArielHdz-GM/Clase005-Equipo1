const express = require('express');
const router = express.Router();
const Cita = require('../models/cita');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'Token no proporcionado' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuarioId = decoded.id;
    next();
  } catch {
    return res.status(403).json({ msg: 'Token inválido' });
  }
};

router.post('/', auth, async (req, res) => {
  const { fecha, hora, servicio } = req.body;
  try {
    const nuevaCita = new Cita({ usuario: req.usuarioId, fecha, hora, servicio });
    await nuevaCita.save();
    res.status(201).json({ msg: 'Cita registrada' });
  } catch (err) {
    res.status(500).json({ msg: 'Error al registrar cita' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const citas = await Cita.find({ usuario: req.usuarioId });
    res.json(citas);
  } catch {
    res.status(500).json({ msg: 'Error al obtener citas' });
  }
});

module.exports = router;
