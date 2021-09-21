import express from 'express';
import { getMrezarina, updateMrezarina} from '../../controllers/mrezarinaController.js';

const router = express.Router()

router.route('/').get(getMrezarina).post(updateMrezarina);


export default router;