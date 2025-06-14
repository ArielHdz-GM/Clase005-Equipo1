const mongoose = require('mongoose');

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectado');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = conectarDB;
