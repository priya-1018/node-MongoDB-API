import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{
        type: String
    },
    usn:{
        unique: true,
        required: true,
        type: Number
    },
    address:{
        type: String
    }
    
    
})
const User = mongoose.model("User",userSchema)
export default User