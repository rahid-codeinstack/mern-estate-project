import express from 'express';
import { getListing  , FindListing , getalListing} from '../Controller/listing.controller.js';
const router = express.Router();

router.get('/getlisting/:listingid',getListing);
router.get('/searchlisting',FindListing);
router.get("/all-listing",getalListing);
export default router;
