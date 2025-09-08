import express from 'express';
import { signUp , signIn  , google} from '../Controller/auth.controller.js';
import {ipKeyGenerator, rateLimit} from 'express-rate-limit'

const router = express.Router();

const  signInRateLimit = rateLimit({
          windowMs: 10 * 60 * 1000,
          max:5,
          headers:function(req,res,next,options){
               return res.status(4029).json({
                         message:' Too many request please try again later ',
                         success:false,
                         status:429,

               })
          },
          ipKeyGenerator:(req) => req.email || req.ip,
          skipSuccessfulRequests: true,
         
})
const  signUpRateLimit = rateLimit({
          windowMs: 10 * 60 * 1000,
          max:5,
          headers:function(req,res,next,options){
               return res.status(429).json({
                         message:' Too many request please try again later ',
                         success:false,
                         status:429,

               })
          },  
})



     
          router.post("/sign-up", signUpRateLimit, signUp);
          router.post("/sign-in",signInRateLimit,signIn);
          router.post("/google",google);


export default router;
