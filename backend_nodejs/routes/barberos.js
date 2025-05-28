const express = require('express');
const router = express.Router();

const barberos = [
  { nombre: "Carlos", experiencia: "5 años" },
  { nombre: "Luis", experiencia: "3 años" }
];

router.get('/', (req, res) => {
  res.json(barberos);
});

module.exports = router;
