import express from 'express';
const router =express.Router();
import {createListing,deleteListing,updateListing,getListing,getListings,getListingsFiltered, getAllListings ,getProperties} from '../Controllers/listingController.js'
import {verifyAdmin} from '../Middleware/authMiddleware.js';

router.post('/create',createListing)
router.post('/delete/:id',verifyAdmin,deleteListing)
router.post('/update/:id',updateListing)
router.get('/get/:id',verifyAdmin,getListing)
router.get('/get',getListings);
router.get('/filtered',getListingsFiltered);
router.get('/getAll',getAllListings);
router.get('/filter',getProperties);

export default router;

