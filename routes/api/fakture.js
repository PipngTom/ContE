import express from 'express';
import { getContractByMeterId, rezervnaFaktura, getRezervnaFaktura} from '../../controllers/fakturaController.js';

const router = express.Router()


router.route('/bfaktura').post(rezervnaFaktura).get(getRezervnaFaktura);

router.route('/:id').get(getContractByMeterId);


export default router;