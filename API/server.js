const mongoose = require('mongoose');
require('dotenv').config();

const app = require('./src/app');
const { connectDB } = require('./src/config/database');
const { initSocket } = require('./src/config/socket');
const { connectMQTT } = require('./src/services/mqttService');

const PORT = process.env.PORT || 5000;

// Connexion à MongoDB
connectDB();

// Initialisation du serveur HTTP
const server = app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📡 Environnement: ${process.env.NODE_ENV}`);
});

// Socket.IO pour temps réel
initSocket(server);

// MQTT pour Packet Tracer IoT (à adapter plus tard avec les nouveaux modèles)
// connectMQTT();

// Gestion des erreurs non capturées
process.on('unhandledRejection', (err) => {
  console.error('❌ UNHANDLED REJECTION:', err);
  server.close(() => process.exit(1));
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM reçu, fermeture du serveur...');
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('💾 MongoDB déconnecté');
      process.exit(0);
    });
  });
});