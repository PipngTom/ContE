import express from 'express';
import { getAllMrezarina, getMrezarina, updateMrezarina, saveMrezarina} from '../../controllers/mrezarinaController.js';
import { protect } from '../../middleware/authMiddleware.js';

const router = express.Router()

router.route('/').get(protect, getMrezarina).post(updateMrezarina);
router.route('/sve').get(getAllMrezarina)
router.route('/new').post(saveMrezarina)


export default router;