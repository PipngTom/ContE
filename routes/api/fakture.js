import express from 'express';
import { getContractByMeterId, rezervnaFaktura, getRezervnaFaktura} from '../../controllers/fakturaController.js';
import { protect } from '../../middleware/authMiddleware.js';

const router = express.Router()


router.route('/bfaktura').post(rezervnaFaktura).get(protect, getRezervnaFaktura);

router.route('/:id').get(getContractByMeterId);


export default router;