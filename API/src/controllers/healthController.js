const HealthRecord = require('../models/HealthRecord');
const Batch = require('../models/Batch');

// @desc    Tous les enregistrements sanitaires
// @route   GET /api/health
exports.getAllRecords = async (req, res) => {
  try {
    const records = await HealthRecord.find().populate('batchId', 'batchCode name').sort({ date: -1 });
    res.json({ success: true, data: records });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Créer un enregistrement
// @route   POST /api/health
exports.createRecord = async (req, res) => {
  try {
    const last = await HealthRecord.findOne().sort({ recordCode: -1 });
    let newCode = 'HR001';
    if (last) {
      const num = parseInt(last.recordCode.replace('HR', '')) + 1;
      newCode = `HR${String(num).padStart(3, '0')}`;
    }
    const record = new HealthRecord({ ...req.body, recordCode: newCode });
    await record.save();
    // Mettre à jour la bande si mortalité
    if (record.dailyMortality > 0 && record.batchId) {
      await Batch.findByIdAndUpdate(record.batchId, { $inc: { currentCount: -record.dailyMortality } });
    }
    res.status(201).json({ success: true, data: record });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Mettre à jour
// @route   PUT /api/health/:code
exports.updateRecord = async (req, res) => {
  try {
    const record = await HealthRecord.findOneAndUpdate(
      { recordCode: req.params.code },
      req.body,
      { new: true }
    );
    if (!record) return res.status(404).json({ success: false, message: 'Record not found' });
    res.json({ success: true, data: record });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Supprimer
// @route   DELETE /api/health/:code
exports.deleteRecord = async (req, res) => {
  try {
    const record = await HealthRecord.findOneAndDelete({ recordCode: req.params.code });
    if (!record) return res.status(404).json({ success: false, message: 'Record not found' });
    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Récupérer par batch
// @route   GET /api/health/batch/:batchId
exports.getByBatch = async (req, res) => {
  try {
    const records = await HealthRecord.find({ batchId: req.params.batchId }).sort({ date: -1 });
    res.json({ success: true, data: records });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};