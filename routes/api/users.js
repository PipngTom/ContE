import express from 'express';
import { registerUser, userLogin, unosRacuna } from '../../controllers/userController.js';

const router = express.Router()

router.route('/').post(registerUser);
router.route('/login').post(userLogin);
router.route('/unosi').post(unosRacuna)

export default router;