import express from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import { createDonation, getDonations, updateDonationStatus } from '../controllers/donationsController.js';

const router = express.Router();

router.get('/', requireAuth, getDonations);
router.post('/', requireAuth, createDonation);
router.put('/:id/status', requireAuth, updateDonationStatus);

export default router;
