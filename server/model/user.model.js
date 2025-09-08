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
          },
          evater:{
               type:String,
               required:true,
               default:"https://cdn-icons-png.flaticon.com/128/3135/3135715.png",
          }

     
},{timestamp:true})

const USER_MODEL = model("UserModel ", userSchema);

export default USER_MODEL;
