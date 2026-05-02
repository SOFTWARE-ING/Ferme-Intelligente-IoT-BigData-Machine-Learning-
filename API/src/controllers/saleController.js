const Sale = require('../models/Sale');
const Batch = require('../models/Batch');

// @desc    Toutes les ventes
// @route   GET /api/sales
exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find().populate('batchId', 'batchCode name').sort({ saleDate: -1 });
    res.json({ success: true, data: sales });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Créer une vente
// @route   POST /api/sales
exports.createSale = async (req, res) => {
  try {
    const last = await Sale.findOne().sort({ saleCode: -1 });
    let newCode = 'SALE001';
    if (last) {
      const num = parseInt(last.saleCode.replace('SALE', '')) + 1;
      newCode = `SALE${String(num).padStart(3, '0')}`;
    }
    const sale = new Sale({ ...req.body, saleCode: newCode });
    await sale.save();
    // Réduire le stock de la bande
    if (sale.batchId) {
      await Batch.findByIdAndUpdate(sale.batchId, { $inc: { currentCount: -sale.quantity } });
    }
    res.status(201).json({ success: true, data: sale });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Mettre à jour le statut de paiement
// @route   PATCH /api/sales/:code/payment
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus, paymentMethod, totalAmount } = req.body;
    const sale = await Sale.findOneAndUpdate(
      { saleCode: req.params.code },
      { paymentStatus, paymentMethod, totalAmount },
      { new: true }
    );
    if (!sale) return res.status(404).json({ success: false, message: 'Sale not found' });
    res.json({ success: true, data: sale });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Supprimer une vente
// @route   DELETE /api/sales/:code
exports.deleteSale = async (req, res) => {
  try {
    const sale = await Sale.findOneAndDelete({ saleCode: req.params.code });
    if (!sale) return res.status(404).json({ success: false, message: 'Sale not found' });
    res.json({ success: true, message: 'Sale deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Statistiques de ventes (CA mensuel, etc.)
// @route   GET /api/sales/stats
exports.getSalesStats = async (req, res) => {
  try {
    const totalRevenue = await Sale.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const monthly = await Sale.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: { year: { $year: '$saleDate' }, month: { $month: '$saleDate' } }, amount: { $sum: '$totalAmount' } } },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 6 }
    ]);
    res.json({
      success: true,
      data: {
        totalRevenue: totalRevenue[0]?.total || 0,
        monthlyRevenue: monthly
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};