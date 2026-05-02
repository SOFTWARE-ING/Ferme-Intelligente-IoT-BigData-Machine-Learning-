const Supplier = require('../models/Supplier');

// CRUD standard
exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find().sort({ name: 1 });
    res.json({ success: true, data: suppliers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getSupplierByCode = async (req, res) => {
  try {
    const supplier = await Supplier.findOne({ code: req.params.code });
    if (!supplier) return res.status(404).json({ success: false, message: 'Supplier not found' });
    res.json({ success: true, data: supplier });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createSupplier = async (req, res) => {
  try {
    const last = await Supplier.findOne().sort({ code: -1 });
    let newCode = 'SUP001';
    if (last) {
      const num = parseInt(last.code.replace('SUP', '')) + 1;
      newCode = `SUP${String(num).padStart(3, '0')}`;
    }
    const supplier = new Supplier({ ...req.body, code: newCode });
    await supplier.save();
    res.status(201).json({ success: true, data: supplier });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findOneAndUpdate(
      { code: req.params.code },
      req.body,
      { new: true }
    );
    if (!supplier) return res.status(404).json({ success: false, message: 'Supplier not found' });
    res.json({ success: true, data: supplier });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findOneAndDelete({ code: req.params.code });
    if (!supplier) return res.status(404).json({ success: false, message: 'Supplier not found' });
    res.json({ success: true, message: 'Supplier deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};