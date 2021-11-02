import express from 'express';
import { newClient, getAllClients, getSingleClient, getSingleClientByMeterId, deleteSingleClient } from '../../controllers/clientController.js';

const router = express.Router()

router.route('/').get(getAllClients);
router.route('/:id').get(getSingleClient).delete(deleteSingleClient);
router.route('/meterid/:id').get(getSingleClientByMeterId);
router.route('/new').post(newClient);



export default router;