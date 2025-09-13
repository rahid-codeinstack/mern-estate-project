import LISTING_MODEL from "../model/listing.mod.js";
import USER_MODEL from "../model/user.model.js";

export async function getListing(req,res,next){
     const listingid = req.params.listingid;
     try {
               const listing = await LISTING_MODEL.findById(listingid);
               const user = await USER_MODEL.findById(listing.userid).select('email !_id');
                 
          
               if(!listing){
                    next(404,'listing not found ');
                    return;

               }
                   
          const list = {...listing._doc,email:user.email};


               res.status(200).json({
                    success:true,
                    status:200,
                    message:'get successfully',
                    listing:list,
               })
     } catch (error) {
          next(error);

     }
}