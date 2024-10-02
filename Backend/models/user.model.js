import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    fullname:{
        type:String,
        requaired:true
    },
    email:{
        type:String,
        requaired:true,
        unique:true
    },
    phoneNumber:{
        type:Number,
        requaired:true
    },
    password:{
        type:String,
        requaired:true,
    },
    role:{
        type:String,
        enum:['student','recruiter'],
        required:true
    },
    profile:{
        bio:{
            type:String
        },
        skills:[{type:String}],
        resume:{type:String},
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId,ref:'Company'},
        profilePhoto:{
            type:String,
            default:""
        }
    }
},{timestamp:true})

export const User =mongoose.model("User",userSchema) 