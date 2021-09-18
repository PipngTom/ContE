import express from 'express';
import { newMetering, getAllMeteringByMeterId, deleteSingleMetering } from '../../controllers/meteringController.js';

const router = express.Router()

router.route('/').post(getAllMeteringByMeterId);
router.route('/delete').post(deleteSingleMetering);
router.route('/new').post(newMetering);




export default router;