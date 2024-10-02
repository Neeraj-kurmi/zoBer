import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob=async(req,res)=>{
    try {
        const userId=req.id;
        const jobId=req.params.id;
        if(!jobId){
            return res.status(400).json({
                massage:"jobId is required",
                success:false
            })
        }
        const existingApplication=await Application.findOne({job:jobId,applicant:userId})
        if(existingApplication){
            return res.status(400).json({
                massage:"you already applied for this job",
                success:false
            })
        }

        const job=await Job.findById(jobId)
        if(!job){
            return res.status(400).json({
                massage:"job not found",
                success:false
            })
        }
        const newApplication=await Application.create({
            job:jobId,
            applicant:userId
        })

        job.applications.push(newApplication._id)
        await job.save();
        return res.status(200).json({
            massage:"job applied successfully",
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

export const getAppliedJob=async(req,res)=>{
    try {
        
        const userId=req.id;
        const application=await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:"job",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"company",
                options:{sort:{createdAt:-1}}
            }
        })
        if(!application){
            return res.status(400).json({
                massage:"application is required",
                success:false
            })
        }
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

export const getApplicants =async(req,res)=>{
    try {
        const jobId=req.params.id;
        const job=await Job.findById(jobId).populate({
            path:"applications",
            options:{sort:{createdAt:-1}},
            populate:({
                path:"applicant",
            })
        })
        if(!job){
            return res.status(400).json({
                massage:"job not found",
                success:false
            })
        }
        return res.status(200).json({
            job,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

export const  updateStatus =async(req,res)=>{
    try {
        const {status} =req.body;
        const applicationId=req.params.id;
        if(!status){
            return res.status(400).json({
                massage:"status not found",
                success:false
            })
        }
        const application=await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(400).json({
                massage:"application not found",
                success:false
            })
        }
        application.status=status.toLowerCase();
        await application.save();
        return res.status(200).json({
            massage:"status update sucessfully",
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}
