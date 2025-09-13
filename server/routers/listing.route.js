import express from 'express';
import { getListing  , FindListing} from '../Controller/listing.controller.js';
const router = express.Router();

router.get('/getlisting/:listingid',getListing);
router.get('/searchlisting',FindListing);
export default router;
