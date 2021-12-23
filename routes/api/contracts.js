import express from 'express';
import { getAllContracts, newContract, getSingleContract, getSingleContractByClientId, deleteSingleContract } from '../../controllers/contractController.js';
import { protect } from '../../middleware/authMiddleware.js';

const router = express.Router()

router.route('/').get(protect, getAllContracts);
router.route('/:id').get(protect, getSingleContract).delete(protect, deleteSingleContract);
router.route('/ugovorklijent').post(protect, getSingleContractByClientId);
router.route('/new').post(protect, newContract);




export default router;