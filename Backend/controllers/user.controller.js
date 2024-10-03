import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register=async (req,res)=>{
    try {
        const {fullname,email,phoneNumber,password,role}=req.body;
        
        if(!fullname || !email || !phoneNumber || !password || !role){
            return  res.status(400).json({
                massage:"Something is missing",
                success:false
            })
        }
        const file=req.file;
        console.log(file)
        let cloudResponse="";
        if(file){
        const fileUri=getDataUri(file)
         cloudResponse =await cloudinary.uploader.upload(fileUri.content)
        }

        const user =await User.findOne({email});
        if(user){
            return res.status(400).json({
                massage:"user already exists",
                success:false
            })
        }
        const hashedPassword=await bcrypt.hash(password,10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password:hashedPassword,
            role,
            profile:{
                profilePhoto: file ? cloudResponse.secure_url :""
            }
        })
        console.log("asddsad")
        return res.status(200).json({
            massage:"Account created successfully",
            success:true
            
        })
    } catch (error) {
        console.log(error)
    }

}

export const login=async (req,res)=>{
    try {
        const {email,password,role}=req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                massage:"Something is missing",
                success :false,
            })
        }
        let user =await User.findOne({email});
        if(!user){
            return res.status(400).json({
                massage:"Incorrect email Or Password",
                success:false
            })
        }

        const passwordMatch =await bcrypt.compare(password,user.password);
        if(!passwordMatch){
            return res.status(400).json({
                massage:`Incorrect email Or Password${passwordMatch}`,
                success:false
            })
        }

        if(role !=user.role){
            return res.status(400).json({
                massage:"Account dose'nt exist with current role",
                success:false
            })
        }

        const tokenData={
            userId:user._id
        }
        const token =await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'})
        
        user={
            _id:user._id,
            fullname:user.fullname,
            phoneNumber:user.phoneNumber,
            role:user.role,
            email:user.email,
            profile:user.profile
        }

        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'strict'}).json({
            massage:`Welcome Back ${user.fullname}`,
            user,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

export const logout=async (req,res)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            massage :"Logout Successfully",
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateProfile=async(req,res)=>{
    try {
        const {fullname,email,phoneNumber,bio,skills}=req.body;
        const file=req.file
        //cloudinary
        const fileURI=getDataUri(file);
        const clouldResponse=await cloudinary.uploader.upload(fileURI.content)

        let skillsArray;
        if(skills) {
            skillsArray=skills.split(",");
        }
        const userId =req.id;
        let user=await User.findById(userId);

        if(!user){
            return res.status(400).json({
                massage:"user not found",
                success:false
            })
        }//updating data
        if(email)user.email=email
        if(fullname)user.fullname=fullname
        if(bio)user.profile.bio=bio
        if(skills)user.profile.skills=skillsArray
        if(phoneNumber)user.phoneNumber=phoneNumber
        //resume 
        if(clouldResponse){
            user.profile.resume=clouldResponse.secure_url //save cloudinary url
            user.profile.resumeOriginalName=file.originalname;//resume k name show hoga
        }

        await user.save();

        user={
            _id:user._id,
            fullname:user.fullname,
            phoneNumber:user.phoneNumber,
            role:user.role,
            email:user.email,
            profile:user.profile
        }

        return  res.status(200).json({
            massage:"profile updated",
            user,
            success:true
        })

    } catch (error) {
        console.log(error)
    }
}
