
import LISTING_MODEL from "../model/listing.mod.js";
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

// -------------------------------------------- delete user function ------------------------------------------ 


export async function deleteUser(req,res,next) {
     if(req.userid !== req.params.userid){
          next(errorHandler(401,"you can delete your own account "));
          return;
     }
     try {
               const deletedUser = await USER_MODEL.deleteOne({_id:req.params.userid},{new:true});

               if(deletedUser){
                    res.clearCookie("access_token");
                    res.status(200).json({
                         message: "deleted successfully",
                         statusCode: 200,
                         success: true,

                    })     
               }
     } catch (error) {
          next(error);

     }
     
}

export async function signOutUser(req,res,next) {
     const userid = req.params.userid;
     if(userid !== req.userid){
          next(errorHandler(401,'you can signOut your  own accoutn '));
          return;
     }
     res.clearCookie("access_token");
     res.status(200).json({
          sucess:true,
          message:'sign out sucessfully',
          success:true,
     })
}



// ------------------------------------------ user create listing function ------------------------------------ 


export async function createListing(req,res,next) {
       
        
          const listing = {
                    name:req.body.name,
                    description:req.body.description,
                    type:req.body.type,
                    address:req.body.address,
                    bed:Number(req.body.bed),
                    bath:Number(req.body.bath),
                    regularPrice:Number(req.body.regularPrice),
                    discountPrice:Number(req.body.discountPrice),
                    images:req.body.images,
                    parking:Boolean(req.body.parking),
                    furnished:Boolean(req.body.furnished),

                    
          }
     

          if(!req.userid){
               next(errorHandler(401 , ' you can create your own listing  '));
               return;   
          }
          if(
               !req.body.name || !req.body.description || !req.body.address  ||
               !req.body.type  || !req.body.regularPrice  || 
               req.body.images.length < 0  || req.body.bed === 0 
           ){

               next(errorHandler(409,' form all field required when create listing '));
               return;
           }
           if(req.body.offer === true && req.body.discountPrice === 0 ){
               
               next(errorHandler(409,'form all field required when create listing '));
               return;
           }
          listing.userid = req.userid;
          try {
                    const newListing = new LISTING_MODEL(listing);
                    await newListing.save();
                         res.status(201).json({
                              message:"created sucessfully ",
                              statusCode:201,
                              success:true,
                              listing:newListing,
                         })
          } catch (error) {
                    next(error);
          }

     
     
}



// -------------------------------------------------------- get all user listing function ---------------------------------------------


export async function  allUserListing(req,res,next) {
     const listingId = req.params.id;
     
     
}