import express from 'express';
import { verify } from '../utils/verify.js';
import {updateUser , deleteUser, signOutUser , createListing} from '../Controller/user.controller.js';

const router = express.Router();

router.get("/test",verify,(req,res)=>res.json({message:"hellow world"}));
router.post("/update",verify,updateUser);
router.delete("/delete/:userid",verify,deleteUser);
router.get("/signout/:userid",verify,signOutUser);
router.post("/create-listing", verify, createListing)


export default router;
