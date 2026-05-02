const express = require('express');
const router = express.Router();
const buildingController = require('../controllers/buildingController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.get('/', buildingController.getAllBuildings);
router.get('/:code', buildingController.getBuildingByCode);
router.get('/:code/sensors/latest', buildingController.getLatestSensorData);

router.post('/', authorize('admin', 'manager'), buildingController.createBuilding);
router.put('/:code', authorize('admin', 'manager'), buildingController.updateBuilding);
router.delete('/:code', authorize('admin'), buildingController.deleteBuilding);

module.exports = router;