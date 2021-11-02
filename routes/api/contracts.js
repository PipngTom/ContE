import express from 'express';
import { getAllContracts, newContract, getSingleContract, getSingleContractByClientId, deleteSingleContract } from '../../controllers/contractController.js';

const router = express.Router()

router.route('/').get(getAllContracts);
router.route('/:id').get(getSingleContract).delete(deleteSingleContract);
router.route('/ugovorklijent/:id').get(getSingleContractByClientId);
router.route('/new').post(newContract);




export default router;