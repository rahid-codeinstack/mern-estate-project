import express from 'express';
import { getListing } from '../Controller/listing.controller.js';
const router = express.Router();

router.get('/getlisting/:listingid',getListing);

export default router;
