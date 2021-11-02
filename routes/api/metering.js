import express from 'express';
import { newMetering, getAllMeteringByMeterId, deleteSingleMetering, getMeteringByMeterIds, fakturaMetering } from '../../controllers/meteringController.js';

const router = express.Router()

router.route('/').post(getAllMeteringByMeterId);
router.route('/delete').post(deleteSingleMetering);
router.route('/new').post(newMetering);
router.route('/all').post(getMeteringByMeterIds);
router.route('/fakturametering').post(fakturaMetering)




export default router;