import LISTING_MODEL from "../model/listing.mod.js";

export async function getListing(req,res,next){
     const listingid = req.params.listingid;
     try {
               const listing = await LISTING_MODEL.findById(listingid);
               if(!listing){
                    next(404,'listing not found ');
                    return;

               }
               res.status(200).json({
                    success:true,
                    status:200,
                    message:'get successfully',
                    listing:listing,
               })
     } catch (error) {
          next(error);
          
     }
}