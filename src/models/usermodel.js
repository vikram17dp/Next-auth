import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,"please provide an name"],
        unique:true
    },
    email:{
        type:String,
        require:[true,"please provide an email"],
        unique:true
    },
    password:{
        type:String,
        require:[true,"please provide password"],
        unique:true
    },
    isVerifed:{
        default:false,
        type:Boolean
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotpasswordToken:String,
    forgotpasswordTokenExpriy:Date,
    verifyToken:String,
    verifyTokenExpiry:Date
})

const User = mongoose.model.users || mongoose.model("users",userschema)

export default User;