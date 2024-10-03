import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup} from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constants";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

function Signup() {
  const [input,setInput]=useState({
    fullname:"",
    phoneNumber:"",
    email:"",
    password:"",
    role:"",
    file:""
  });
  
  const {loading,user}=useSelector(store=>store.auth)
  const navigate=useNavigate(); 
  const dispatch= useDispatch();

  const changeEventHandler=(e)=>{
    setInput({...input,[e.target.name]:e.target.value})
  }
  const changeFileHandler=(e)=>{
    setInput({...input,file:e.target.files?.[0]})
  }
  const submitHandler=async (e)=>{
       e.preventDefault();
       const formData =new FormData();
       formData.append("fullname",input.fullname);
       formData.append("email",input.email);
       formData.append("phoneNumber",input.phoneNumber);
       formData.append("password",input.password);
       formData.append("role",input.role);
       if(input.file){
        formData.append("file",input.file);
       }
       try {
        dispatch(setLoading(true))
           const res=await axios.post(`${USER_API_END_POINT}/register`,formData,{
            header:{
              "Content-Type":"multipart/form-data"
            },
            withCredentials:true
           })
           if(res.data.success){
            navigate("/login")
            toast.success(res.data.massage)
           }
       } catch (error) {
          console.log(error)
          toast.error(error.response.data.massage)
       }
       finally{
        dispatch(setLoading(false))
      }
  }

  useEffect(()=>{
    if(user){
      navigate("/")
    }
})
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form onSubmit={submitHandler} className="w-1/2 border-gray-200 rounded-md p-4 my-10">
          <h1 className="font-bold text-xl">Sign Up</h1>
          <div>
            <Label>Full Name</Label>
            <Input type="text" placeholder="enter name here..." value={input.fullname} name="fullname" onChange={changeEventHandler}></Input>
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" placeholder="enter email here..."value={input.email} name="email" onChange={changeEventHandler}></Input>
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input type="text" placeholder="enter number here..."value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler}></Input>
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" placeholder="enter password here..." value={input.password} name="password" onChange={changeEventHandler}></Input>
          </div>
          <div className="md:flex-row items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-4">
              <div className="flex items-center space-x-2">
                <Input
                    type="radio"
                    name="role"
                    value="student"
                    cheaked={input.role==='student'}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                />
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
              <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    cheaked={input.role==='recruiter'}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                />
                <Label htmlFor="option-two">Recruiter </Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
                  <Label>Profile</Label>
                  <Input
                    accept="image/*"
                    type="file"
                    onChange={changeFileHandler}
                    className="cursor-pointer"               
                    />
            </div>
          </div>
          {
            loading ? <Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>please wait</Button>
            :<Button type="submit" className="w-full my-4">Sign Up</Button>
          }
          <span className="text-sm">Already have an account? <Link to="/login" className="text-blue-600">Login</Link></span>
        </form>
      </div>
    </>
  );
}

export default Signup;
