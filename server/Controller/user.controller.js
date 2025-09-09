
import USER_MODEL from "../model/user.model.js";
import errorHandler from "../utils/errorHandler.js";
export async function  updateUser(req,res,next) {
          const {username,email,password,id , evater} = req.body;
          if(req.userid !== id){
               next(errorHandler(401,'you can not update'));
               return;   
          }
          try {
               const updatedUser = await USER_MODEL.findByIdAndUpdate(id,{$set:{
                         username,email,password,evater
               }},{new:true});
               
               if(updatedUser){
                    res.status(200).json({
                         message:" update sucessfully",
                         success:true,
                         statusCode:200,
                         user:{
                              username:updatedUser.username,
                              email:updatedUser.email,
                              evater:updatedUser.evater,
                              _id:updatedUser._id,
                         }
                    })
               }
               
          } catch (error) {
               next(error);

          }
     
}