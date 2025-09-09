import express from 'express';
import { createAppraisal, getAppraisal } from '../Controllers/appraisalController.js';
import {verifyAdmin} from '../Middleware/authMiddleware.js';

export default function(io) {
  const router = express.Router();

  router.post('/new', (req, res) => createAppraisal(req, res, io));
  router.get('/appraisal',verifyAdmin,getAppraisal);

  return router; 
};



