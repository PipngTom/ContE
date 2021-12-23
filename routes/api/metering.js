import express from 'express';
import { newMetering, getAllMeteringByMeterId, deleteSingleMetering, getMeteringByMeterIds, fakturaMetering, savePreuzimanjeMerenja } from '../../controllers/meteringController.js';
import { protect } from '../../middleware/authMiddleware.js';

const router = express.Router()

router.route('/').post(protect, getAllMeteringByMeterId);
router.route('/delete').post(protect, deleteSingleMetering);
router.route('/new').post(protect, newMetering);
router.route('/all').post(protect, getMeteringByMeterIds);
router.route('/fakturametering').post(protect, fakturaMetering)
router.route('/preuzimanje').post(savePreuzimanjeMerenja)



export default router;