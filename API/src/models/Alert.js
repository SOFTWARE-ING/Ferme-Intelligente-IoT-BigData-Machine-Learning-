const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  buildingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Building' },
  batchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },
  type: { type: String, required: true },
  message: { type: String, required: true },
  severity: { type: String, enum: ['info', 'warning', 'critical'], default: 'warning' },
  resolved: { type: Boolean, default: false },
  resolvedAt: Date
}, { timestamps: true });

module.exports = mongoose.model('Alert', alertSchema);