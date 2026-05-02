const Batch = require('../models/Batch');
const Building = require('../models/Building');
const Sale = require('../models/Sale');
const Alert = require('../models/Alert');
const SensorData = require('../models/SensorData');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalBatches = await Batch.countDocuments();
    const activeBatches = await Batch.countDocuments({ status: 'growing' });
    const totalBuildings = await Building.countDocuments({ status: 'active' });
    const totalBirds = await Batch.aggregate([{ $group: { _id: null, total: { $sum: '$currentCount' } } }]);
    const totalSalesToday = await Sale.aggregate([
      { $match: { saleDate: { $gte: new Date().setHours(0,0,0,0) } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const activeAlerts = await Alert.countDocuments({ resolved: false });
    const latestSensorData = await SensorData.find().sort({ timestamp: -1 }).limit(10);
    res.json({
      success: true,
      data: {
        totalBatches,
        activeBatches,
        totalBuildings,
        totalBirds: totalBirds[0]?.total || 0,
        todaySalesAmount: totalSalesToday[0]?.total || 0,
        activeAlerts,
        latestSensorReadings: latestSensorData
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Graphique d'évolution des températures (24h)
exports.getTemperatureTrend = async (req, res) => {
  try {
    const since = new Date(Date.now() - 24 * 3600000);
    const data = await SensorData.find({ sensorType: 'temperature', timestamp: { $gte: since } })
      .sort({ timestamp: 1 })
      .limit(200);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};