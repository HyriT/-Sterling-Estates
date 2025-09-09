import express from 'express';
const router =express.Router();
import {createListing,deleteListing,updateListing,getListing,getListings,getListingsFiltered, getAllListings } from '../Controllers/listingController.js'
import {verifyToken} from '../Middleware/verifyUser.js';

router.post('/create',verifyToken,createListing)
router.post('/delete/:id',verifyToken,deleteListing)
router.post('/update/:id',verifyToken,updateListing)
router.get('/get/:id',verifyToken,getListing)
router.get('/get',getListings);
router.get('/filtered', getListingsFiltered);
router.get('/getAll',getAllListings);

export default router;

