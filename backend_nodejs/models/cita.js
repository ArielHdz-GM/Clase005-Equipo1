const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  fecha: { type: String, required: true },
  hora: { type: String, required: true },
  servicio: { type: String, required: true }
});

module.exports = mongoose.model('Cita', citaSchema);
