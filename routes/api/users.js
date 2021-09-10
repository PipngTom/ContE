import express from 'express';
import { registerUser, userLogin } from '../../controllers/userController.js';

const router = express.Router()

router.route('/').post(registerUser);
router.route('/login').post(userLogin)

export default router;