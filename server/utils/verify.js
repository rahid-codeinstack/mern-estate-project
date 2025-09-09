import jwt from "jsonwebtoken";
import errorHandler from "./errorHandler.js";

export function verify ( req, res , next ) {
   
     const token = req.cookies['access_token'];
     if(!token){
          next(errorHandler(401,'unauthorize'));
          return;
     }
     jwt.verify(token,process.env.JWT_SECRET,(err,result)=>{
          if(err){
               next(403 , ' forbidden ');
               return;
          }
          req.userid = result.id;
          next();

     })
   
}