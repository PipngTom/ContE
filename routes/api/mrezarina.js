import express from 'express';
import { getAllMrezarina, getMrezarina, updateMrezarina, saveMrezarina, getMrezarinaPoDat} from '../../controllers/mrezarinaController.js';
import { protect } from '../../middleware/authMiddleware.js';

const router = express.Router()

router.route('/:id').get(protect, getMrezarina);
router.route('/update').post(updateMrezarina)
router.route('/').get(protect, getAllMrezarina)
router.route('/new').post(saveMrezarina)
router.route('/faktura/podatumu').get(protect, getMrezarinaPoDat)


export default router;