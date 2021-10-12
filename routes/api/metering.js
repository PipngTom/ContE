import express from 'express';
import { newMetering, getAllMeteringByMeterId, deleteSingleMetering, getMeteringByMeterIds } from '../../controllers/meteringController.js';

const router = express.Router()

router.route('/').post(getAllMeteringByMeterId);
router.route('/delete').post(deleteSingleMetering);
router.route('/new').post(newMetering);
router.route('/all').post(getMeteringByMeterIds);




export default router;