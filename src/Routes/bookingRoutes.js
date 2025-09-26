import express from 'express';
const router =express.Router();
import {createBooking} from '../Controllers/bookingController.js'
import {verifyUser} from '../Middleware/authMiddleware.js';

router.post('/booking',createBooking)


export default router;

