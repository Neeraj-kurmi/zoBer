import {Job} from "../models/job.model.js"

export const postJob=async (req,res)=>{
    try {
        const {title,description,requirements,salary,location,jobType,experience,positions,companyId}=req.body

        if(!title||!description||!requirements||!salary||!location||!jobType||!experience||!positions||!companyId){
                return res.status(400).json({
                    massage:"something is missing",
                    success:false
                })
        }
        const userId=req.id
        const job=await Job.create({
            title,
            description,
            requirements :requirements.split(","),
            salary:Number(salary),
            location,
            jobType,
            experienceLevel:experience,
            positions,
            company:companyId,
            created_by:userId
        })
        return res.status(200).json({
            massage:"job created successfully",
            job,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

export const getAllJob=async (req,res)=>{
    try {
       const keyword=req.query.keyword || "";
       const query ={
           $or:[
            {title:{$regex:keyword, $options:"i"}},
            {description:{$regex:keyword,$options:"i"}}
           ]   
       } 
       const jobs=await Job.find(query).populate({
        path:'company'
       }).sort({createAt:-1})
       if(!jobs){
        return res.status(400).json({
            massage:"job not found",
            success:false
        })
       }
       return res.status(200).json({
        jobs,
        success:true
    })
    } catch (error) {
        console.log(error)
    }
}

export const getJobById=async(req,res)=>{
    try {
        const jobId=req.params.id;
        const job=await Job.findById(jobId).populate({
            path:"applications"
        })
        if(!job){
            return res.status(400).json({
                massage:"job not found",
                success:false
            })
           }
           return res.status(200).json({
            job ,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

export const getAdminJob=async(req,res)=>{
    try {
        
        const adminid=req.id;
        const jobs=await Job.find({created_by:adminid}).populate({
            path:'company',
            createdAt:-1
        })
        if(!jobs){
            return res.status(400).json({
                massage:"job not found",
                success:false
            })
           }
           return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}