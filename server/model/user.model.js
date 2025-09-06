import { Schema , model} from "mongoose";
const userSchema = Schema({
          username:{
               type:String,
               required:true
          },
          email:{
               type:String,
               required:true,
               unique:true,
          },
          password:{
               type:String,
               required:true,         
          }

     
},{timestamp:true})

const USER_MODEL = model("UserModel ", userSchema);

export default USER_MODEL;
