import express from 'express';
import { verify } from '../utils/verify.js';

const router = express.Router();

router.get("/test",verify,(req,res)=>res.json({message:"hellow world"}));


export default router;
