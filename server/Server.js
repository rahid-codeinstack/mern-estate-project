import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDataBase } from './DB/connection.js';
import authRouter from './routers/auth.route.js'
dotenv.config();

const app = express();

// ---------------------------------- request midddlware ---------------------------------------------------- 

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// ------------------------------------- route middlware section ---------------------------------------------
app.use('/api/auth' , authRouter);


// -------------------------------------- test route ---------------------------------------------------------
app.get( "/test", ( req  , res ) => {
     res.send({
          success:true,
          message:"  hellow world  ",
          status:200,
     });
} );


// -------------------------- app runing --------------------------------------------------------------------------

const portno = process.env.PORTNO || 3000 ;
app.listen(portno,()=>{
     console.log( "app running on portno "+ portno );
})

// ----------------------------------------------- db connection call ------------------------------------------------

connectDataBase()

// ----------------------------------------------- error handle middleware ------------------------------------------------

app.use((error,req,res,next)=>{
     const statusCode = error.status || error.statusCode || 500;
     const message = error.message || 'internal server error ';
     res.status(statusCode).json({
          message,
          statusCode,
          success:false
     })
})