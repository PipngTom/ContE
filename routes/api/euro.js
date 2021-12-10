import express from "express";
import { kursEura } from '../../controllers/kursEuraController.js'

const router = express.Router()

router.route('/').get(kursEura)

export default router