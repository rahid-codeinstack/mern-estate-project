import {hashSync} from 'bcrypt'
import USER_MODEL from '../model/user.model.js';
import errorHandler from '../utils/errorHandler.js';
// ----------------------------------------------- sign up function ----------------------------------------------

 export async function signUp (req , res ,next ) {
       const userBody = req.body;
       userBody.password = hashSync(userBody.password , 10 );
     try {
          const userExiste = await USER_MODEL.findOne({email:userBody.email});
          
          if(userExiste){
               return res.status(409).json(errorHandler(409,"user already existe sign in your  account "));
          }
          const signUpUser = new USER_MODEL(userBody);
          signUpUser.save();
          res.status(201).json({
               success:true,
               message:"user created successfully ",
               statusCode:201,
          })

     } catch (error) {
          console.log(error.message)
          next(error)
     };


}