import express from 'express';
import { newClient, getAllClients, getSingleClient, getSingleClientByMeterId, deleteSingleClient } from '../../controllers/clientController.js';
import { protect } from '../../middleware/authMiddleware.js';

const router = express.Router()

router.route('/').get(protect, getAllClients);
router.route('/:id').get(protect, getSingleClient).delete(deleteSingleClient);
router.route('/meterid/:id').get(protect, getSingleClientByMeterId);
router.route('/new').post(protect, newClient);



export default router;