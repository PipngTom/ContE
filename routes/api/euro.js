import express from "express";
import { getAllEuro, getKursEura, saveEuro, kursEura } from '../../controllers/kursEuraController.js';
import { protect } from "../../middleware/authMiddleware.js";
//import { kursEura } from '../../controllers/kursEuraController.js'

const router = express.Router()

router.route('/new').post(protect, saveEuro)
router.route('/').get(protect, getAllEuro)
router.route('/:id').get(protect, getKursEura)
router.route('/nbs/kurs').get(kursEura)

export default router