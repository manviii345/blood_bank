import express from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import { createRequest, getRequests, updateRequestStatus } from '../controllers/requestsController.js';

const router = express.Router();

router.get('/', requireAuth, getRequests);
router.post('/', requireAuth, createRequest);
router.put('/:id/status', requireAuth, updateRequestStatus);

export default router;
