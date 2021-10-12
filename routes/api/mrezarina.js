import express from 'express';
import { getMrezarina, updateMrezarina} from '../../controllers/mrezarinaController.js';
import { protect } from '../../middleware/authMiddleware.js';

const router = express.Router()

router.route('/').get(protect, getMrezarina).post(updateMrezarina);


export default router;