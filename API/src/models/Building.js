const mongoose = require('mongoose');

const buildingSchema = new mongoose.Schema({
  buildingCode: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['growing', 'quarantine', 'storage'], default: 'growing' },
  capacity: Number,
  currentOccupancy: Number,
  temperature: Number,
  humidity: Number,
  ammonia: Number,
  status: { type: String, enum: ['active', 'maintenance', 'inactive'], default: 'active' },
  responsible: String,
  lastMaintenance: Date,
  nextMaintenance: Date,
  alerts: [String]
}, { timestamps: true });

module.exports = mongoose.model('Building', buildingSchema);