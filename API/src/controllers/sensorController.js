const SensorData = require('../models/SensorData');
const Building = require('../models/Building');
const Alert = require('../models/Alert');

// @desc    Ajouter une donnée capteur (depuis MQTT ou API manuelle)
// @route   POST /api/sensors/data
exports.addSensorData = async (req, res) => {
  try {
    const { buildingCode, sensorType, value, timestamp } = req.body;
    const building = await Building.findOne({ buildingCode });
    if (!building) return res.status(404).json({ success: false, message: 'Building not found' });
    const data = new SensorData({
      buildingId: building._id,
      buildingCode,
      sensorType,
      value,
      timestamp: timestamp || new Date()
    });
    await data.save();
    // Mettre à jour les dernières valeurs dans Building
    const updateField = {};
    if (sensorType === 'temperature') updateField.temperature = value;
    if (sensorType === 'humidity') updateField.humidity = value;
    if (sensorType === 'ammonia') updateField.ammonia = value;
    await Building.findByIdAndUpdate(building._id, updateField);
    // Vérifier les seuils et créer des alertes si nécessaire
    await checkThresholds(building, sensorType, value);
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Fonction interne pour vérifier les seuils
async function checkThresholds(building, type, value) {
  let alertMessage = null;
  if (type === 'temperature' && value > 32) alertMessage = `High temperature (${value}°C) in ${building.name}`;
  else if (type === 'humidity' && value > 75) alertMessage = `High humidity (${value}%) in ${building.name}`;
  else if (type === 'ammonia' && value > 15) alertMessage = `High ammonia (${value}ppm) in ${building.name}`;
  if (alertMessage) {
    await Alert.create({
      buildingId: building._id,
      type,
      message: alertMessage,
      severity: 'warning'
    });
  }
}

// @desc    Récupérer l'historique d'un bâtiment
// @route   GET /api/sensors/history/:buildingCode
exports.getSensorHistory = async (req, res) => {
  try {
    const { buildingCode } = req.params;
    const { hours = 24, type } = req.query;
    const since = new Date(Date.now() - hours * 3600000);
    const building = await Building.findOne({ buildingCode });
    if (!building) return res.status(404).json({ success: false, message: 'Building not found' });
    const query = { buildingId: building._id, timestamp: { $gte: since } };
    if (type) query.sensorType = type;
    const data = await SensorData.find(query).sort({ timestamp: 1 });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};