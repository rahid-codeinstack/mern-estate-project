import express from 'express';
import { verify } from '../utils/verify.js';
import {rateLimit} from 'express-rate-limit'
import {updateUser , deleteUser, signOutUser , createListing , allUserListing , deleteListing , UpdateListing} from '../Controller/user.controller.js';
import errorHandler from '../utils/errorHandler.js';

const router = express.Router();

const createListingLimit = rateLimit({
          windowMs: 50 * 60 * 1000,
          headers:(req,res,next,Option)=>{
               return next(errorHandler(429,"complete create listing limite pleast try to create another time "));
          }
          ,
          max:10,     
          
})
router.get("/test",verify,(req,res)=>res.json({message:"hellow world"}));
router.post("/update",verify,updateUser);
router.delete("/delete/:userid",verify,deleteUser);
router.get("/signout/:userid",verify,signOutUser);
router.post("/create-listing", verify ,createListingLimit , createListing );
router.get("/all-listing/:userid",verify, allUserListing);
router.delete("/deletelisting/:listingid",deleteListing);
router.put('/updatelisting/:listingid',verify,UpdateListing)



export default router;
