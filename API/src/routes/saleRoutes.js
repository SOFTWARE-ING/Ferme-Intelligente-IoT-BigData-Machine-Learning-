const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.get('/', saleController.getAllSales);
router.get('/stats', saleController.getSalesStats);

router.post('/', authorize('admin', 'manager'), saleController.createSale);
router.patch('/:code/payment', authorize('admin', 'manager'), saleController.updatePaymentStatus);
router.delete('/:code', authorize('admin'), saleController.deleteSale);

module.exports = router;