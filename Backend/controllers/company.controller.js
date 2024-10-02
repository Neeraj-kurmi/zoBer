import {Company} from "../models/company.model.js"
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany =async (req,res)=>{
    try {
        const {companyName}=req.body
        if(!companyName){
            return res.status(400).json({
                massage:"company name is required",
                success:false
            })
        }
        let company=await Company.findOne({name:companyName})
        if(company){
            return res.status(400).json({
                massage:"company name is already exists",
                success:false
            })
        } 
        company =await Company.create({
            name:companyName,
            userId:req.id
        })
        return res.status(200).json({
            massage:"company registered successfull",
            company,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

export const getCompany=async(req,res)=>{
    try {
        const userId=req.id
        const compaies=await Company.find({userId})
        if(!compaies){
            return res.status(400).json({
                massage:"company not found",
                success:false
            })
        }
        return res.status(200).json({
            compaies,
            success:true
        })
    } catch (error) {
        
    }
}

export const getCompanyId=async(req,res)=>{
    try {
        const companyid=req.params.id
        const company=await Company.findById(companyid)
        if(!company){
            return res.status(400).json({
                massage:"company not found",
                success:false
            })
        }
        return res.status(200).json({
            company,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateCompany =async (req,res)=>{
    try {
        const {name,description,website,location}=req.body
        const file=req.file
        //cloudinary
        const fileUri =getDataUri(file)
        const cloudResponse =await cloudinary.uploader.upload(fileUri.content)
        const logo=cloudResponse.secure_url;

        const updatedata={name,description,website,location,logo}
        const company=await Company.findByIdAndUpdate(req.params.id,updatedata,{new:true})

        if(!company){
            return res.status(400).json({
                massage:"company not found",
                success:false
            })
        }
        return res.status(200).json({
            massage:"company update successfully",
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}