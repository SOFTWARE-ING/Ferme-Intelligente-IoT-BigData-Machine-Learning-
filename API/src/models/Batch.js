const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  batchCode: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  supplierName: String,
  buildingIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Building' }],
  startDate: { type: Date, required: true },
  status: { type: String, enum: ['startup', 'growing', 'quarantine', 'ready_to_sell'], default: 'startup' },
  initialCount: { type: Number, required: true },
  currentCount: { type: Number, required: true },
  ageDays: Number,
  avgWeightKg: Number,
  mortalityRate: Number,  // pourcentage
  feedConsumptionKg: Number,
  waterConsumptionL: Number,
  avgTemperature: Number,
  avgHumidity: Number,
  nextVaccination: Date,
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Batch', batchSchema);