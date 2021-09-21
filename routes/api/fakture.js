import express from 'express';
import { getContractByMeterId} from '../../controllers/fakturaController.js';

const router = express.Router()

router.route('/:id').get(getContractByMeterId);


export default router;