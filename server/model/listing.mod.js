import mongoose, { Mongoose } from "mongoose";

const listingSchema = mongoose.Schema({
     name:{type:String,required:true},
     description:{type:String,required:true},
     address:{type:String,required:true},
     type:{type:String,required:true},
     parking:{type:Boolean,required:true,default:false},
     furnished:{type:Boolean,required:true,default:false},
     offer:{type:Boolean,required:true,default:false},
     bed: { type: Number, required: true , default:1 },
     bath: { type: Number, required: true , default:0 },
     regularPrice: { type: Number, required: true  },
     descountPrice: { type: Number, required: true  },
     images: { type:[String], required: true },      
},{timestamp:true})


const LISTING_MODEL = mongoose.model("Listings",listingSchema);
export default LISTING_MODEL;
