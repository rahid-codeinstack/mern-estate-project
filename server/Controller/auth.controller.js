import {hashSync,compareSync} from 'bcrypt'
import USER_MODEL from '../model/user.model.js';
import errorHandler from '../utils/errorHandler.js';
import jwt from "jsonwebtoken"

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



// --------------------------------------- sign in function -----------------------------------------------------------

export async function  signIn(req,res,next) {
     const userbody = req.body;
     console.log(userbody);

     try {
               const valideUser = await USER_MODEL.findOne({email:userbody.email});
               if(!valideUser){
                    return next(errorHandler(404, 'wronge email or password '));
               }
     
               const validpassword = compareSync(userbody.password,valideUser.password);
            
               
               if(!validpassword){
                    return next(errorHandler(404,'wrong credential '))
               }
               const token = jwt.sign({id:valideUser._id},process.env.JWT_SECRET);
             res.status(200).cookie("access_token", token ,{
                    httpOnly:true,
                    maxAge: 1000 * 60 * 60 * 24 * 3 
                    ,
                    secure:true,

             })
            .json({
                    success:true,
                    message:"sign in successfully ",
                    statusCode:200,
                    user: {
                       _id: valideUser._id,
                       email: valideUser.email,
                       username: valideUser.username,
                  }
             })

     } catch (error) {
          next(error)
     }
     
}










// ------------------------------------------ sign in with google -------------------------------------

function generatePassword(passLength){
     const pasString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~<>?";
     let password = "";
     for(let i = 0 ; i <= passLength ; i++ ){
          let passchar = Math.floor(Math.random() * pasString.length);
          password  += passchar;
     }
     return password;
}

 export async function  google(req,res,next) {
     const {username, email } = req.body;
     const user = await USER_MODEL.findOne({email});

     if(user){
          const token = jwt.sign({ id:user._id }, process.env.JWT_SECRET);
          res.status(200).cookie("access_token", token, {
               httpOnly: true,
               maxAge: 1000 * 60 * 60 * 24 * 3
               ,
               secure: true,

          }).json({
                    success: true,
                    message: "sign in successfully ",
                    statusCode: 200,
                    user: {
                         _id:user_id,
                         email:user.email,
                         username:user.username,
                    }
               })
     }else{
          const newPassword = generatePassword(10);
          const hashPassword = hashSync(newPassword,10);
          const newUser = new USER_MODEL({username,email,password:hashPassword});
          newUser.save();
      
               const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
               res.status(200).cookie("access_token", token, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24 * 3
                    ,
                    secure: true,

               }).json({
                    success: true,
                    message: "sign in successfully ",
                    statusCode: 200,
                    user: {
                         _id: newUser._id,
                         email: newUser.email,
                         username: newUser.username,
                    }
               })
          }

     }
     
