const express = require('express');
const cors = require('cors');
require('dotenv').config();
const conectarDB = require('./config/db');

const authRoutes = require('./routes/auth');
const citaRoutes = require('./routes/citas');
const barberoRoutes = require('./routes/barberos');
const servicioRoutes = require('./routes/servicios');

const app = express();
app.use(cors());
app.use(express.json());

conectarDB();

app.use('/api/auth', authRoutes);
app.use('/api/citas', citaRoutes);
app.use('/api/barberos', barberoRoutes);
app.use('/api/servicios', servicioRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
