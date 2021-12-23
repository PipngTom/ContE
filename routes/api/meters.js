import express from 'express';
import { getAllMeters, newMeter, getSingleMeter, deleteSingleMeter, getAllMetersByKlijentId } from '../../controllers/meterController.js';
import { protect } from '../../middleware/authMiddleware.js';

const router = express.Router()

router.route('/').get(protect, getAllMeters);
router.route('/:id').get(protect, getSingleMeter).delete(protect, deleteSingleMeter);
router.route('/racuni/:id').get(protect, getAllMetersByKlijentId);
router.route('/new').post(protect, newMeter);




export default router;