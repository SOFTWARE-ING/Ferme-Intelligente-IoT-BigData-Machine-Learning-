const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema({
  recordCode: { type: String, required: true, unique: true },
  batchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch', required: true },
  batchName: String,
  date: { type: Date, required: true },
  type: { type: String, enum: ['exam', 'vaccination', 'emergency'], required: true },
  veterinarian: String,
  dailyMortality: Number,
  symptoms: [String],
  treatment: String,
  vaccine: String,
  dose: String,
  observations: String,
  nextVisit: Date,
  alerts: [String]
}, { timestamps: true });

module.exports = mongoose.model('HealthRecord', healthRecordSchema);