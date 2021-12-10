import express from 'express';
import { getAllContracts, newContract, getSingleContract, getSingleContractByClientId, deleteSingleContract } from '../../controllers/contractController.js';
import { protect } from '../../middleware/authMiddleware.js';

const router = express.Router()

router.route('/').get(protect, getAllContracts);
router.route('/:id').get(protect, getSingleContract).delete(deleteSingleContract);
router.route('/ugovorklijent').post(getSingleContractByClientId);
router.route('/new').post(newContract);




export default router;