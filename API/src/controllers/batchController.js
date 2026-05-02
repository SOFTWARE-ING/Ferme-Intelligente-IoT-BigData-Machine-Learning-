const Batch = require('../models/Batch');
const Building = require('../models/Building');

// @desc    Récupérer toutes les bandes (avec filtres optionnels)
// @route   GET /api/batches
exports.getAllBatches = async (req, res) => {
  try {
    const { status, search } = req.query;
    let query = {};
    if (status && status !== 'all') query.status = status;
    if (search) query.name = { $regex: search, $options: 'i' };
    const batches = await Batch.find(query)
      .populate('buildingIds', 'buildingCode name')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: batches });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Récupérer une bande par son code
// @route   GET /api/batches/:code
exports.getBatchByCode = async (req, res) => {
  try {
    const batch = await Batch.findOne({ batchCode: req.params.code }).populate('buildingIds');
    if (!batch) return res.status(404).json({ success: false, message: 'Batch not found' });
    res.json({ success: true, data: batch });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Créer une nouvelle bande
// @route   POST /api/batches
exports.createBatch = async (req, res) => {
  try {
    const last = await Batch.findOne().sort({ batchCode: -1 });
    let newCode = 'BATCH001';
    if (last) {
      const num = parseInt(last.batchCode.replace('BATCH', '')) + 1;
      newCode = `BATCH${String(num).padStart(3, '0')}`;
    }
    const batch = new Batch({ ...req.body, batchCode: newCode });
    await batch.save();
    // Mettre à jour l'occupation des bâtiments
    if (batch.buildingIds && batch.buildingIds.length) {
      await Building.updateMany(
        { _id: { $in: batch.buildingIds } },
        { $inc: { currentOccupancy: batch.currentCount } }
      );
    }
    res.status(201).json({ success: true, data: batch });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Mettre à jour une bande
// @route   PUT /api/batches/:code
exports.updateBatch = async (req, res) => {
  try {
    const batch = await Batch.findOneAndUpdate(
      { batchCode: req.params.code },
      req.body,
      { new: true, runValidators: true }
    );
    if (!batch) return res.status(404).json({ success: false, message: 'Batch not found' });
    res.json({ success: true, data: batch });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Supprimer une bande
// @route   DELETE /api/batches/:code
exports.deleteBatch = async (req, res) => {
  try {
    const batch = await Batch.findOneAndDelete({ batchCode: req.params.code });
    if (!batch) return res.status(404).json({ success: false, message: 'Batch not found' });
    res.json({ success: true, message: 'Batch deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Statistiques rapides pour le dashboard
// @route   GET /api/batches/stats
exports.getBatchStats = async (req, res) => {
  try {
    const total = await Batch.countDocuments();
    const growing = await Batch.countDocuments({ status: 'growing' });
    const ready = await Batch.countDocuments({ status: 'ready_to_sell' });
    const totalBirds = await Batch.aggregate([{ $group: { _id: null, total: { $sum: '$currentCount' } } }]);
    const avgMortality = await Batch.aggregate([{ $group: { _id: null, avg: { $avg: '$mortalityRate' } } }]);
    res.json({
      success: true,
      data: {
        totalBatches: total,
        growingBatches: growing,
        readyBatches: ready,
        totalBirds: totalBirds[0]?.total || 0,
        avgMortalityRate: (avgMortality[0]?.avg || 0).toFixed(1)
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};