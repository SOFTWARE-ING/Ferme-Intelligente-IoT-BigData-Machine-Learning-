const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  saleCode: { type: String, required: true, unique: true },
  invoiceNumber: String,
  batchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },
  batchName: String,
  customerName: { type: String, required: true },
  customerType: { type: String, enum: ['individual', 'professional'] },
  customerPhone: String,
  quantity: { type: Number, required: true },
  unitPrice: Number,
  totalAmount: Number,
  saleDate: { type: Date, default: Date.now },
  paymentMethod: { type: String, enum: ['cash', 'transfer', 'check', 'card'] },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'cancelled'], default: 'pending' },
  deliveryAddress: String,
  deliveryStatus: String,
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Sale', saleSchema);