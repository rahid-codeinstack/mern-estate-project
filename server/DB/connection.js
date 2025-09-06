import mongoose from 'mongoose'

 export async function connectDataBase(){
     try {
          const res = await mongoose.connect(process.env.MONGO_URI);
          console.log(res.connection.host)
          console.log('db connected ')

     } catch (error) {
          console.log(error)
          if(error.message){
               console.log("connection denied ");
          }
     };
};
