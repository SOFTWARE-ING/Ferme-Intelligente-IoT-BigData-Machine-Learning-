const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.get('/', healthController.getAllRecords);
router.get('/batch/:batchId', healthController.getByBatch);

router.post('/', authorize('admin', 'vet'), healthController.createRecord);
router.put('/:code', authorize('admin', 'vet'), healthController.updateRecord);
router.delete('/:code', authorize('admin'), healthController.deleteRecord);

module.exports = router;