
import express from 'express';
import { submitContactForm, getAllContacts } from '../Controllers/contactController.js';;
  const router = express.Router();

router.post('/submit',submitContactForm);
router.get('/admin/contacts',getAllContacts);

export default router; 

