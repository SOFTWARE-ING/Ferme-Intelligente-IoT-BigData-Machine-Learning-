const express = require('express');
const router = express.Router();
const batchController = require('../controllers/batchController');
const { protect, authorize } = require('../middleware/auth');

// Toutes les routes nécessitent authentification
router.use(protect);

// Routes générales
router.get('/', batchController.getAllBatches);
router.get('/stats', batchController.getBatchStats);
router.get('/:code', batchController.getBatchByCode);

// Création, modification, suppression (réservées admin/manager)
router.post('/', authorize('admin', 'manager'), batchController.createBatch);
router.put('/:code', authorize('admin', 'manager', 'vet'), batchController.updateBatch);
router.delete('/:code', authorize('admin'), batchController.deleteBatch);

module.exports = router;