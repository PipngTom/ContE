import express from 'express';
import { getAllMeters, newMeter, getSingleMeter, deleteSingleMeter } from '../../controllers/meterController.js';

const router = express.Router()

router.route('/').get(getAllMeters);
router.route('/:id').get(getSingleMeter).delete(deleteSingleMeter);
router.route('/new').post(newMeter);




export default router;