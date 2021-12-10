import express from 'express';
import { getAllNametii, getNametePoDatumu, getNameti, saveNameti, updateNamete } from '../../controllers/nametiController.js';
import { protect } from '../../middleware/authMiddleware.js';

const router = express.Router()

router.route('/:id').get(protect, getNameti)

router.route('/').get(protect, getAllNametii)

router.route('/new').post(saveNameti)

router.route('/update/podaci').post(updateNamete)

router.route('/faktura/datum').get(protect, getNametePoDatumu)

export default router;