import express from 'express';
import { verify } from '../utils/verify.js';
import {updateUser} from '../Controller/user.controller.js';

const router = express.Router();

router.get("/test",verify,(req,res)=>res.json({message:"hellow world"}));
router.post("/update",verify,updateUser)


export default router;
