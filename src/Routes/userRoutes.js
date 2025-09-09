import express from 'express';
import {test,updateUser,deactivateUser,getUserListing,getUser,getAllUsers,resetPassword} from '../Controllers/userContoller.js'; 
import {verifyAdmin,verifyUser} from '../Middleware/authMiddleware.js';

const router =express.Router();

router.get("/test",test); //test route

router.post('/update/:id',updateUser)
router.delete('/deactivate/:id',verifyAdmin,deactivateUser)
router.get('/listing/:id',getUserListing)
router.get('/allUsers',verifyAdmin, getAllUsers);
router.put('/resetPassword/:id',verifyAdmin,resetPassword);
router.get('/:id', getUser);


export default router;


