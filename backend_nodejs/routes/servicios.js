const express = require('express');
const router = express.Router();

const servicios = [
  { nombre: "Corte de cabello", descripcion: "Corte clásico o moderno" },
  { nombre: "Afeitado", descripcion: "Afeitado con toalla caliente" }
];

router.get('/', (req, res) => {
  res.json(servicios);
});

module.exports = router;
