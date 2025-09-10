import mongoose from "mongoose";
import { string } from "zod";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,

    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    token:{
        type: String,
    }
})

const User = mongoose.model("User", userSchema);
export default User;