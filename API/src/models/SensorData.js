const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema({
  buildingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Building', required: true },
  buildingCode: String,
  sensorType: { type: String, enum: ['temperature', 'humidity', 'ammonia'], required: true },
  value: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now, required: true }
}, { timeseries: { timeField: 'timestamp', metaField: 'sensorType', granularity: 'seconds' } });

sensorDataSchema.index({ buildingId: 1, timestamp: -1 });

module.exports = mongoose.model('SensorData', sensorDataSchema);