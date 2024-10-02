import mongoose from "mongoose";

const jobSchema =new mongoose.Schema({
    title:{
        type:String,
        reqired:true,
    },
    experienceLevel:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        reqired:true,
    },
    requirements:[{
        type:String,
        reqired:true,
    }],
    salary:{
        type:Number,
        reqired:true,
    },
    location:{
        type:String,
        reqired:true,
    },
    jobType:{
        type:String,
        reqired:true,
    },
    positions:{
        type:Number,
        reqired:true,
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        reqired:true,
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        reqired:true,
    },
    applications:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Application'
        }
    ]
},{timestamps:true})

export const Job=mongoose.model("Job",jobSchema);