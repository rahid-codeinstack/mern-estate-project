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



// ------------------------------------------------------- find listing function ------------------------------------------- ;
export async function FindListing(req,res,next) {
    
     const limite = req.query.limite || 9 ;
     const startIndex = req.query.startindex || 0;
     const order = req.query.order || 'desc';
      let  sort = req.query.sort || "createdate";
     let  searchterm = req.query.searchterm;


     let  furnished = req.query.furnished;
     if(furnished === undefined || furnished === 'false' ){
          furnished = {$in:[true,false]}
     }

     let  parking = req.query.parking;
     if(parking === undefined || parking === 'false' ){
          parking = {$in:[true,false]}
     }

     let  type = req.query.type;
     console.log(type);
     if(type === undefined || type === 'all')
     {
          type={$in:['rent','sale']}
     }

      let  offer = req.query.offer;
     if(offer === undefined || offer === 'false'){
          offer = {$in:[true,false]},
          furnished,
          parking,
          type
     }

    

 console.log(type);
     
     try {
     const listings = await LISTING_MODEL.find({
          name:{$regex:searchterm,$options:'i'},
          type,
          offer,
          parking,
          furnished

     }).sort({[sort]:order}).limit(limite).skip(startIndex);
     res.send(listings);
     } catch (error) {
          next(error);
     }

     
}