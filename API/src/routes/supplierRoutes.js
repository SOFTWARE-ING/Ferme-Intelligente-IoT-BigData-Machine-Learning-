const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.get('/', supplierController.getAllSuppliers);
router.get('/:code', supplierController.getSupplierByCode);

router.post('/', authorize('admin', 'manager'), supplierController.createSupplier);
router.put('/:code', authorize('admin', 'manager'), supplierController.updateSupplier);
router.delete('/:code', authorize('admin'), supplierController.deleteSupplier);

module.exports = router;