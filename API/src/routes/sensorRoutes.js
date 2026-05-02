const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');
const { protect } = require('../middleware/auth');

// Toutes les routes sont protégées
router.use(protect);

// Récupérer l'historique d'un bâtiment
router.get('/history/:buildingCode', sensorController.getSensorHistory);

// Ajouter une donnée manuellement (ou via MQTT)
router.post('/data', sensorController.addSensorData);

module.exports = router;