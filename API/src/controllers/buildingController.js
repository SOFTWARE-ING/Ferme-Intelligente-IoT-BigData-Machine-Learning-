const Building = require('../models/Building');
const SensorData = require('../models/SensorData');

// @desc    Tous les bâtiments
// @route   GET /api/buildings
exports.getAllBuildings = async (req, res) => {
  try {
    const buildings = await Building.find().sort({ createdAt: -1 });
    res.json({ success: true, data: buildings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Bâtiment par code
// @route   GET /api/buildings/:code
exports.getBuildingByCode = async (req, res) => {
  try {
    const building = await Building.findOne({ buildingCode: req.params.code });
    if (!building) return res.status(404).json({ success: false, message: 'Building not found' });
    res.json({ success: true, data: building });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Créer un bâtiment
// @route   POST /api/buildings
exports.createBuilding = async (req, res) => {
  try {
    const last = await Building.findOne().sort({ buildingCode: -1 });
    let newCode = 'BLD01';
    if (last) {
      const num = parseInt(last.buildingCode.replace('BLD', '')) + 1;
      newCode = `BLD${String(num).padStart(2, '0')}`;
    }
    const building = new Building({ ...req.body, buildingCode: newCode });
    await building.save();
    res.status(201).json({ success: true, data: building });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Mettre à jour un bâtiment
// @route   PUT /api/buildings/:code
exports.updateBuilding = async (req, res) => {
  try {
    const building = await Building.findOneAndUpdate(
      { buildingCode: req.params.code },
      req.body,
      { new: true }
    );
    if (!building) return res.status(404).json({ success: false, message: 'Building not found' });
    res.json({ success: true, data: building });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Supprimer un bâtiment
// @route   DELETE /api/buildings/:code
exports.deleteBuilding = async (req, res) => {
  try {
    const building = await Building.findOneAndDelete({ buildingCode: req.params.code });
    if (!building) return res.status(404).json({ success: false, message: 'Building not found' });
    res.json({ success: true, message: 'Building deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Dernières données capteurs d'un bâtiment
// @route   GET /api/buildings/:code/sensors/latest
exports.getLatestSensorData = async (req, res) => {
  try {
    const building = await Building.findOne({ buildingCode: req.params.code });
    if (!building) return res.status(404).json({ success: false, message: 'Building not found' });
    const latest = await SensorData.find({ buildingId: building._id })
      .sort({ timestamp: -1 })
      .limit(100);
    res.json({ success: true, data: latest });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};