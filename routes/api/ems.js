import express from 'express'
import { getAllEms, getEms, saveEms } from '../../controllers/emsController.js';
import { protect } from '../../middleware/authMiddleware.js';

const router = express.Router()

router.route('/').get(protect, getAllEms)
router.route('/single/:id').get(protect, getEms)
router.route('/new').post(saveEms)

export default router;