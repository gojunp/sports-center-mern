import mongoose from "mongoose";


const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI!,{
       // useCreateIndex: true,
        //useNewUrlParser: true,
       // useFindAndModify: true,
        //useUnifiedTopology: true
    })
  } catch (error) {
    console.log(error)
  }

  const connection = mongoose.connection;
  if(connection.readyState > 1){
    console.log("connected to db");
  }
  connection.on("error",()=>console.log("connection failed"))
}

export default connectDB;

