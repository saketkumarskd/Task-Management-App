import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";

import taskRoute from "../Backend/routes/task.routes.js"
import userRoute from "../Backend/routes/user.route.js"


const app = express();

dotenv.config();


const PORT=process.env.PORT ||4002;
const DB_URI=process.env.MONGODB_URI
//Database connection code
try {
 await mongoose.connect(DB_URI)
    console.log("connected to MongoDB")
} catch (error) {
  console.log(error)  
}

//routes
app.use(express.json());
app.use("/task",taskRoute);
app.use("/user",userRoute);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
