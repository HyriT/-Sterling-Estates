import express from 'express';
import {test,updateUser,deleteUser,getUserListing,getUser,getAllUsers,resetPassword} from '../controllers/userController.js'; 
import {verifyAdmin,verifyUser} from '../Middleware/authMiddlawere.js';

const router =express.Router();

router.get("/test",test);
router.post('/update/:id',verifyAdmin,updateUser)
router.delete('/delete/:id',deleteUser)
router.get('/listing/:id',getUserListing)
router.get('/allUsers',verifyAdmin, getAllUsers);
router.put('/resetPassword/:id',resetPassword);
router.get('/:id', getUser);


export default router;


