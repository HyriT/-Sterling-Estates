import express from 'express';
import {test,updateUser,deactivateUser,getUserListing,getUser,getAllUsers,resetPassword,activateUser} from '../Controllers/userContoller.js'; 
import {verifyAdmin,verifyToken} from '../Middleware/authMiddleware.js';

const router =express.Router();

router.get("/test",test); 

router.put('/update/:id',updateUser)
router.put("/deactivate/:id", verifyAdmin, deactivateUser);
router.put("/activate/:id", verifyAdmin, activateUser);
router.get('/listing/:id',getUserListing)
router.get('/allUsers',verifyAdmin, getAllUsers);
router.put('/resetPassword/:id',verifyToken,resetPassword);
router.get('/:id', getUser);


export default router;


